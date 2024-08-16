import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ErrorDialog = ({
  isOpen,
  onClose,
  errorMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-center py-16">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              className="animate-checkmark-line"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              className="animate-checkmark-line"
            />
          </svg>
        </div>
        <DialogTitle>Error</DialogTitle>
        <DialogDescription className="text-red-600">
          {errorMessage}
        </DialogDescription>
      </DialogContent>
      <style jsx>{`
        .animate-checkmark-line {
          stroke-dasharray: 100px;
          stroke-dashoffset: 100px;
          animation: checkmark 1.5s ease-in-out forwards; /* Adjusted duration */
        }

        @keyframes checkmark {
          0% {
            stroke-dashoffset: 100px;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </Dialog>
  );
};

export default ErrorDialog;
