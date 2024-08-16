"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AuthenticationDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const handleSignIn = () => {
    // Redirect to the sign-in page
    router.push("/sign-in"); // Update with your sign-in route if different
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication Required</DialogTitle>
          <DialogDescription>Please sign in to continue. </DialogDescription>
        </DialogHeader>{" "}
        <div>
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Sign In
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationDialog;
