"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";

export function CredentialsForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = new FormData(e.currentTarget);

    try {
      const signInResponse = await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        redirect: false,
      });

      if (signInResponse && !signInResponse.error) {
        router.back();
      } else {
        console.log("Error: ", signInResponse);
        setError(signInResponse?.error || "Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full flex flex-col space-y-4"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email Address
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="example@123.com"
          required
          className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#028391] focus:ring-2 focus:ring-[#028391]/20 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Password
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#028391] focus:ring-2 focus:ring-[#028391]/20 transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}