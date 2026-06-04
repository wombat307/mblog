import type { Metadata } from "next";
import { Instrument_Serif, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = "https://zhangxiaowan.top";
const SITE_NAME = "袋熊挖呀挖";
const SITE_DESC =
  "袋熊挖呀挖：基于 Next.js 的简洁个人博客，记录生活随笔、读书札记与技术心得。";
const OG_IMAGE = "/og-default.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - 博客`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} RSS` }],
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "zh_CN",
    url: "/",
    title: `${SITE_NAME} - 博客`,
    description: SITE_DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - 博客`,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "袋熊博客",
  url: SITE_URL,
  description: SITE_DESC,
  inLanguage: "zh-CN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${sourceSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Ahrefs analytics (global) */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="75FWAG6EDB2wxlNJnDTHxA"
          async
        ></script>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={websiteSchema} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
