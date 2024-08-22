import type { Metadata } from "next";
import { Lora, Cardo } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";
import NextAuthProvider from "@/context/NextAuthProvider";
import { ServicesProvider } from "@/context/ServicesContext";

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

export const metadata: Metadata = {
  title: "Jenkins Haircut - Premium Barber Services in Lagos Nigeria",
  description:
    "Experience top-quality haircuts and grooming services at Jenkins Haircut. Book your appointment with the best barbers in Lagos Nigeria today.",
  keywords:
    "Jenkins Haircut, barber services, grooming, haircuts, men's grooming, beard trim, Lagos Nigeria barber, barbershop",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Jenkins Haircut - Premium Barber Services in Lagos Nigeria",
    description:
      "Book your next haircut or grooming service at Jenkins Haircut. Top-rated barbershop offering personalized services in Lagos Nigeria.",
    url: process.env.NEXTAUTH_URL,
    type: "website",
    locale: "en_US",
    siteName: "Jenkins Haircut",
  },
  applicationName: "Jenkins Haircut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistMono.variable} ${lora.variable} ${cardo.variable}`}
      >
        <NextAuthProvider>
          <ServicesProvider>
            <BookingProvider>{children}</BookingProvider>
          </ServicesProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
