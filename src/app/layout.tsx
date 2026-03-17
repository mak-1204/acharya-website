import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { ChatBot } from '@/components/ChatBot';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Acharya Education | Your Gateway to IIT, NEET & Beyond',
  description: "Madurai's Most Trusted Coaching Institute since 2007. Expert coaching for JEE, NEET, CUET, CLAT and foundation courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20">
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatBot />
        <Toaster />
        <div className="fixed bottom-6 left-6 z-50">
          <a
            href="tel:9865440099"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full shadow-lg hover:bg-secondary/90 transition-all font-semibold"
          >
            <span className="bg-white/20 p-1 rounded-full">📞</span>
            Call Now
          </a>
        </div>
        <div className="fixed bottom-6 right-6 z-40">
           {/* Chatbot is here, we push it up if needed or let it float */}
        </div>
      </body>
    </html>
  );
}
