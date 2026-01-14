"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Loader2, User, Mail, Lock, AlertCircle } from "lucide-react";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    setLoading(true);
    setError("");

    try {
      if (!name || !email || !password) {
        setError("Please fill all the fields");
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email address");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        console.log("User added successfully");
        setError("");
        router.push("/sign-in");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.error || error.response?.data?.message;
        setError(serverMessage || "An error occurred while registering.");
      } else {
        setError("An unexpected error occurred.");
      }
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
        <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          required
          className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:border-[#028391] focus:ring-2 focus:ring-[#028391]/20 transition-all duration-200"
        />
      </div>

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
        <p className="text-xs text-gray-500">Must be at least 6 characters</p>
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;