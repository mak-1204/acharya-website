'use client';

import React, { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useStorage } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, X, FileIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
  defaultValue?: string;
  label?: string;
  accept?: string;
}

export const FileUploader = ({ 
  onUploadComplete, 
  defaultValue, 
  label = "Upload File",
  accept = "image/*,video/*"
}: FileUploaderProps) => {
  const storage = useStorage();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultValue || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    if (!storage) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Firebase Storage is not initialized. Please check your config.",
      });
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: error.message || "Could not upload file. Ensure Storage is enabled and rules allow writes.",
        });
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPreviewUrl(downloadURL);
          onUploadComplete(downloadURL);
          setUploading(false);
          setProgress(0);
          toast({
            title: "Upload Success",
            description: "File uploaded successfully.",
          });
        } catch (err: any) {
          console.error("Error getting download URL:", err);
          setUploading(false);
          toast({
            variant: "destructive",
            title: "Download URL Error",
            description: "Failed to retrieve the file link.",
          });
        }
      }
    );
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const isVideo = (url: string) => {
    return url.includes('.mp4') || url.includes('video') || (url.includes('storage') && url.toLowerCase().includes('%2fuploads%2f') && !url.match(/\.(jpg|jpeg|png|gif|webp)/i));
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 transition-all flex flex-col items-center justify-center gap-3 text-center cursor-pointer min-h-[160px]",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50",
          uploading && "pointer-events-none opacity-60"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept={accept}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative group w-full h-full flex items-center justify-center">
            {isVideo(previewUrl) ? (
               <div className="flex flex-col items-center gap-2">
                 <FileIcon className="w-12 h-12 text-secondary" />
                 <span className="text-xs font-medium text-muted-foreground truncate max-w-[200px]">Video File Selected</span>
               </div>
            ) : (
              <img src={previewUrl} alt="Preview" className="max-h-32 rounded-lg object-contain shadow-md" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Button 
                type="button"
                variant="destructive" 
                size="icon" 
                className="h-8 w-8"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setPreviewUrl(''); 
                  onUploadComplete(''); 
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to browse</p>
            </div>
          </>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/80 rounded-xl flex flex-col items-center justify-center p-6 gap-3 z-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <Progress value={progress} className="h-1 w-full" />
            <span className="text-xs font-bold text-primary">{Math.round(progress)}% Uploading...</span>
          </div>
        )}
      </div>
    </div>
  );
};
