import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Deepak Interior & CNC | Premium Interiors & CNC Solutions in Hosur",
  description:
    "Leading interior design and CNC manufacturing firm in Hosur. Specializing in modular kitchens, living rooms, bedrooms, false ceilings, fluting panels, jali designs, and custom CNC solutions.",
  keywords: [
    "interior design",
    "CNC",
    "modular kitchen",
    "Hosur",
    "Bangalore",
    "false ceiling",
    "jali design",
    "fluting panels",
  ],
  authors: [{ name: "Deepak Interior & CNC" }],
  creator: "Deepak Interior & CNC",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://deepakinterior.com",
    siteName: "Deepak Interior & CNC",
    title: "Deepak Interior & CNC | Premium Interiors & CNC Solutions in Hosur",
    description:
      "Leading interior design and CNC manufacturing firm in Hosur. Transform your spaces with our premium interior solutions and precision CNC work.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deepak Interior & CNC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Interior & CNC | Premium Interiors & CNC Solutions",
    description:
      "Transform your spaces with premium interior solutions and precision CNC work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ... existing imports ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Deepak Interior & CNC",
              description:
                "Leading interior design and CNC manufacturing firm in Hosur",
              url: "https://deepakinterior.com",
              telephone: "+91-9360349866",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Door No. 391-B, Ground Floor, 100 Feet Inner Ring Road, Kaveri Street, Mookandapalli",
                addressLocality: "Hosur",
                addressRegion: "Tamil Nadu",
                postalCode: "635109",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "12.7409",
                longitude: "77.8253",
              },
              openingHours: "Mo-Sa 09:00-19:00",
              priceRange: "$$",
              image: "/og-image.jpg",
              sameAs: ["https://www.instagram.com/deepakinteriorandcncwork"],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
