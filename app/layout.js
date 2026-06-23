import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'MedBridge Educare | Your Trusted Partner for MBBS Abroad Admissions',
  description: 'MedBridge Educare helps Indian students secure admissions in NMC-compliant MBBS universities across Vietnam, Russia, Georgia, and Timor-Leste. Transparent guidance, ethical counseling, and end-to-end support.',
  keywords: 'MBBS abroad, study MBBS abroad, MBBS in Vietnam, MBBS in Russia, MBBS in Georgia, MBBS in Timor-Leste, NMC approved universities, medical education abroad, MedBridge Educare',
  openGraph: {
    title: 'MedBridge Educare | MBBS Abroad Admissions',
    description: 'NMC-Compliant Universities, Transparent Guidance, and End-to-End Admission Support for MBBS Abroad.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MedBridge Educare',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "MedBridge Educare",
              "description": "Trusted MBBS Abroad Consultancy helping Indian students secure admissions in NMC-compliant universities.",
              "url": process.env.NEXT_PUBLIC_BASE_URL || "https://medbridgeeducare.com",
              "telephone": "+919960360549",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.instagram.com/medbridge_educare"
              ]
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
  {children}
  <Analytics />
</body>
    </html>
  );
}
