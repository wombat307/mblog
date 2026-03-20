import type { Metadata } from "next";
import { Instrument_Serif, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "袋熊的网络空间 - 博客",
  description: "袋熊的网络空间：基于 Next.js 的简洁博客系统",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
