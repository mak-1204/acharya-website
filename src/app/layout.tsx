import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { MainLayoutWrapper } from '@/components/MainLayoutWrapper';

export const metadata: Metadata = {
  title: 'Acharya Education | Your Gateway to IIT, NEET & Beyond',
  description: "Madurai's Most Trusted Coaching Institute since 2007. Expert coaching for JEE, NEET, CUET, CLAT and foundation courses.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      
      <body className="font-body antialiased selection:bg-primary/20 w-full overflow-x-hidden">
        <FirebaseClientProvider>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
