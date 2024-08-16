"use client";

import { GoogleSignInButton } from "@/components/Shared/authButtons";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CredentialsForm } from "@/components/Shared/credentialsForm";
import Link from "next/link";

function Page() {
  const { data: session } = useSession();

  const router = useRouter();

  if (session) return router.push("/");

  return (
    <div className="w-full bg-black bg-opacity-80 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="max-w-sm bg-black flex flex-col items-center px-10 py-8 rounded-lg shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold text-white">Sign In</h1>
        <GoogleSignInButton />
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-12 h-[1px] w-full" />
        <CredentialsForm />
        <div className="mt-4 text-center text-sm text-white">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
