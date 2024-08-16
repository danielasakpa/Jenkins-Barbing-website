import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const SuccessDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center justify-center py-16">
        <div className="checkmark-container">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <p className="mt-4 text-lg font-bold text-green-600">
          Booking Successful!
        </p>
      </DialogContent>
      <style jsx>{`
        .checkmark-container {
          width: 72px;
          height: 72px;
        }
        .checkmark {
          width: 100%;
          height: 100%;
          stroke-width: 2;
          stroke: #4caf50;
          stroke-miterlimit: 10;
          stroke-linecap: round;
          animation: checkmark 0.4s ease-in-out forwards;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark__check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
        }
        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes checkmark {
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </Dialog>
  );
};

export default SuccessDialog;
