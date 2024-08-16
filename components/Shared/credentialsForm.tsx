"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

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
        setError(signInResponse?.error || "Your Email or Password is wrong!");
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
      className="w-full text-black font-semibold flex flex-col"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="flex justify-center p-2 mb-2 p-regular-16 font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-4 mb-4 rounded-md"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-4 mb-4 rounded-md"
      />
      <button
        type="submit"
        className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5 text-white" />
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}
