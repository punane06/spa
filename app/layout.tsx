'use client'
import localFont from "next/font/local";
import { Open_Sans } from 'next/font/google'
import "./globals.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { MainContainer } from "./components/ui/ContainerProps";
import { useState } from "react";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

const boosterNextFY = localFont({
  src: [
    {
      path: './fonts/BoosterNextFY-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BoosterNextFY-Bold.woff2',
      weight: '700',
      style: 'bold',
    }
  ],
  variable: '--font-booster'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <html lang="en" className={`${openSans.className} ${boosterNextFY.variable}`}>
      <body
        className={`flex h-screen text-white bg-backgroundColor relative overflow-auto`}
      >
        <Header isOpen={isOpen} toggleNavbar={toggleNavbar} />
        <Navbar isOpen={isOpen} />
        <MainContainer>
          {children}
        </MainContainer>
      </body>
    </html>
  );
}
