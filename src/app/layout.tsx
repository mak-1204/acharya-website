
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20 w-full overflow-x-hidden">
        <Navbar />
        <main className="pt-16 md:pt-16 lg:pt-16 w-full overflow-x-hidden">{children}</main>
        <Footer />
        <Toaster />
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <a
            href="tel:9865440099"
            className="flex items-center gap-1 bg-secondary text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-2xl hover:bg-secondary/90 hover:scale-110 transition-all font-bold text-xs md:text-lg border-2 border-white/20"
          >
            <span className="bg-white/20 p-1 rounded-full flex items-center justify-center">📞</span>
            Call Now
          </a>
        </div>
      </body>
    </html>
  );
}
