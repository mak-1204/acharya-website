import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { MainLayoutWrapper } from '@/components/MainLayoutWrapper';

export const metadata: Metadata = {
  title: 'Acharya Education | Best JEE NEET CLAT CUET Coaching in Madurai',
  description: 'Acharya Education - Madurai\'s Most Trusted Coaching Institute since 2007. Expert coaching for JEE, NEET, CUET, CLAT, Foundation and Board Exam preparation. 50,000+ students trained. Limited batch of 15 students.',
  keywords: [
    'JEE coaching Madurai',
    'NEET coaching Madurai',
    'CLAT coaching Madurai',
    'CUET coaching Madurai',
    'best coaching institute Madurai',
    'IIT coaching Madurai',
    'medical entrance coaching Madurai',
    'foundation coaching Madurai',
    'state board tuition Madurai',
    'JEE crash course Madurai',
    'NEET repeater batch Madurai',
    'Acharya Education Madurai',
    'integrated school program Madurai'
  ].join(', '),
  authors: [{ name: 'Acharya Education' }],
  creator: 'Acharya Education',
  publisher: 'Acharya Education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.acharyaeducation-madurai.com',
    siteName: 'Acharya Education',
    title: 'Acharya Education | Best JEE NEET Coaching Madurai',
    description: 'Madurai\'s Most Trusted Coaching Since 2007. Expert coaching for JEE, NEET, CUET, CLAT. 50,000+ students trained. Limited batch of 15.',
    images: [
      {
        url: 'https://www.acharyaeducation-madurai.com/ACHARYA.png',
        width: 1200,
        height: 630,
        alt: 'Acharya Education Madurai - Best JEE NEET Coaching',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acharya Education | Best JEE NEET Coaching Madurai',
    description: 'Madurai\'s Most Trusted Coaching Since 2007. JEE, NEET, CUET, CLAT coaching with limited batch of 15 students.',
    images: ['https://www.acharyaeducation-madurai.com/ACHARYA.png'],
  },
  alternates: {
    canonical: 'https://www.acharyaeducation-madurai.com',
  },
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Acharya Education",
              "url": "https://www.acharyaeducation-madurai.com",
              "logo": "https://www.acharyaeducation-madurai.com/ACHARYA.png",
              "image": "https://www.acharyaeducation-madurai.com/ACHARYA.png",
              "description": "Madurai's Most Trusted Coaching Institute since 2007. Expert coaching for JEE, NEET, CUET, CLAT and Foundation programs.",
              "foundingDate": "2007",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "No. 9, 8th St, Karpaga Nagar, K. Pudur",
                "addressLocality": "Madurai",
                "addressRegion": "Tamil Nadu",
                "postalCode": "625007",
                "addressCountry": "IN"
              },
              "telephone": ["+919865440099", "+918870440099"],
              "email": "Acharyaeducation.madurai@gmail.com",
              "sameAs": [],
              "numberOfEmployees": "50+",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Coaching Programs",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "JEE Main & Advanced Coaching",
                    "description": "Comprehensive JEE preparation for Class 11, 12 and Repeaters",
                    "provider": {
                      "@type": "Organization",
                      "name": "Acharya Education"
                    }
                  },
                  {
                    "@type": "Course",
                    "name": "NEET Medical Coaching",
                    "description": "Expert NEET coaching for Class 11, 12 and Repeaters",
                    "provider": {
                      "@type": "Organization",
                      "name": "Acharya Education"
                    }
                  },
                  {
                    "@type": "Course",
                    "name": "CLAT Law Entrance Coaching",
                    "description": "Dedicated CLAT preparation for Class 11 and 12",
                    "provider": {
                      "@type": "Organization",
                      "name": "Acharya Education"
                    }
                  },
                  {
                    "@type": "Course",
                    "name": "CUET Preparation",
                    "description": "CUET coaching for Class 12 students",
                    "provider": {
                      "@type": "Organization",
                      "name": "Acharya Education"
                    }
                  },
                  {
                    "@type": "Course",
                    "name": "Foundation Program",
                    "description": "JEE NEET foundation coaching for Class 6-10",
                    "provider": {
                      "@type": "Organization",
                      "name": "Acharya Education"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Acharya Education",
              "image": "https://www.acharyaeducation-madurai.com/ACHARYA.png",
              "url": "https://www.acharyaeducation-madurai.com",
              "telephone": "+919865440099",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "No. 9, 8th St, Karpaga Nagar, K. Pudur",
                "addressLocality": "Madurai",
                "addressRegion": "Tamil Nadu",
                "postalCode": "625007",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 9.9252,
                "longitude": 78.1198
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday","Tuesday","Wednesday",
                    "Thursday","Friday","Saturday"
                  ],
                  "opens": "09:00",
                  "closes": "19:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Which is the best JEE coaching in Madurai?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Acharya Education is Madurai's most trusted JEE coaching institute since 2007 with 50,000+ students trained and limited batch size of 15 students for personalized attention."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Acharya Education offer NEET coaching in Madurai?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Acharya Education offers comprehensive NEET coaching for Class 11, 12 and Repeaters with limited batch size of 15 students, expert faculty and regular mock tests."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What courses does Acharya Education offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Acharya Education offers JEE Main & Advanced, NEET Medical, CUET, CLAT, Foundation Programs for Class 6-10, Integrated School Programs, JEE/NEET Repeaters, Crash Courses and State Board Tuitions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there CLAT coaching available in Madurai?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Acharya Education offers dedicated CLAT coaching in Madurai for Class 11 and 12 students with weekend batches starting June 2025."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the batch size at Acharya Education?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Acharya Education maintains a strict batch size of 15 students per batch to ensure personalized attention and focused learning for every student."
                  }
                },
                {
                  "@type": "Question",
                  "name": "When was Acharya Education founded?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Acharya Education was founded in 2007 in Madurai, Tamil Nadu and has since trained over 50,000 students across 7+ centres."
                  }
                }
              ]
            })
          }}
        />
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
