import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "NovelPromo - นิยายออนไลน์ Dark Romance สุดเข้มข้น",
    template: "%s | NovelPromo",
  },
  description:
    "อ่านนิยายออนไลน์ Dark Romance, นิยายรัก NC สุดเข้มข้น ตัวอย่างฟรี พร้อมบทความแนะนำนิยายน่าอ่าน",
  keywords: [
    "นิยายออนไลน์",
    "Dark Romance",
    "นิยาย NC",
    "นิยายรัก",
    "อ่านนิยายฟรี",
    "Tunwalai",
    "นิยายไทย",
    "พันธนาการรัตติกาล",
  ],
  authors: [{ name: "NovelPromo" }],
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "NovelPromo",
    title: "NovelPromo - นิยายออนไลน์ Dark Romance สุดเข้มข้น",
    description:
      "อ่านนิยายออนไลน์ Dark Romance, นิยายรัก NC สุดเข้มข้น ตัวอย่างฟรี",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovelPromo - นิยายออนไลน์ Dark Romance สุดเข้มข้น",
    description:
      "อ่านนิยายออนไลน์ Dark Romance, นิยายรัก NC สุดเข้มข้น ตัวอย่างฟรี",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${notoThai.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
