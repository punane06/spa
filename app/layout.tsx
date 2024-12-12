import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const twnFont = localFont({ 
  src: './fonts/BoosterNextFY-Regular.woff2',
  variable: '--twn-font'
})

const twnFontBold = localFont({ 
  src: './fonts/BoosterNextFY-Bold.woff2',
  variable: '--twn-font-bold'
})

export const metadata: Metadata = {
  title: "SPA task - Kerner",
  description: "TWN test task by Kadi Kerner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${twnFont.variable} ${twnFontBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
