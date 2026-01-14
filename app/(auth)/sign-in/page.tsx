"use client";

import { GoogleSignInButton } from "@/components/Shared/authButtons";
import { CredentialsForm } from "@/components/Shared/credentialsForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden py-12 px-4">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-pulse"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#028391]/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>

      {/* Sign In Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-2xl mb-4 shadow-lg shadow-[#028391]/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue to Jenkins Haircut</p>
          </div>

          {/* Google Sign In */}
          <GoogleSignInButton />

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-500 bg-black/40">Or continue with email</span>
            </div>
          </div>

          {/* Credentials Form */}
          <CredentialsForm />

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link 
                href="/sign-up" 
                className="text-[#028391] hover:text-cyan-400 font-semibold transition-colors duration-200"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;