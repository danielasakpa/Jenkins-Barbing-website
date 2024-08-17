"use client";

import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Header";
import { useSession } from "next-auth/react";
import { LucideLoader2 } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  return (
    <div>
      <Header />
      <main className="relative min-h-[100vh] bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto m">
        {status === "loading" ? (
          <div className="fixed inset-0 z-50 bg-black/100">
            <div className="fixed flex justify-center items-center left-[50%] top-[50%] z-50 w-max translate-x-[-50%] translate-y-[-50%] gap-4 p-6">
              <LucideLoader2 className="animate-spin h-7 w-7 text-white" />
              <div className="text-white">Loading</div>
            </div>
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
}
