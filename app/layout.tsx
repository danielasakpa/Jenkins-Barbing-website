import type { Metadata } from "next";
import { Lora, Cardo, Bodoni_Moda } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";
import NextAuthProvider from "@/context/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lora",
});

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cardo",
});

const bodoni_Moda = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bodoni_Moda ",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistMono.variable} ${lora.variable} ${cardo.variable} ${bodoni_Moda.variable}`}
      >
        <NextAuthProvider>
          <BookingProvider>{children}</BookingProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
