"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

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
    setError(""); // Clear any existing error

    try {
      if (!name || !email || !password) {
        setError("Please fill all the fields");
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email ID");
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
        // Check if it's an axios error with a response
        const serverMessage = error.response?.data?.message;
        setError(serverMessage || "An error occurred while registering.");
      } else {
        // For unexpected errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full text-white font-semibold flex flex-col"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="flex justify-center p-2 mb-2 p-regular-16 font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <div className="mb-3">
        <Input
          type="text"
          name="name"
          placeholder="John Doe"
          required
          className="w-full px-4 py-4 rounded-md text-black"
        />
      </div>
      <div className="mb-3">
        <Input
          type="email"
          name="email"
          placeholder="example@123.com"
          required
          className="w-full px-4 py-4 rounded-md text-black"
        />
      </div>
      <div className="mb-3">
        <Input
          type="password"
          name="password"
          placeholder="**********"
          required
          className="w-full px-4 py-4 rounded-md text-black"
        />
      </div>
      <button
        type="submit"
        className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5 text-white" />
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
