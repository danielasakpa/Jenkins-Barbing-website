import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";
import { format, startOfDay, isBefore } from "date-fns";
import { Service } from "@/types";
import { Loader2 } from "lucide-react";
import SuccessDialog from "./SuccessDialog";
import ErrorDialog from "./ErrorDialog";

const BookingConfirmationDialog = ({
  isOpen,
  onClose,
  appointment,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    name: string;
    email: string;
    date: Date | undefined;
    time: string | number | readonly string[] | undefined;
    service: Service;
  };
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBooking = async () => {
    setLoading(true);
    try {
      const today = startOfDay(new Date());
      if (appointment.date && isBefore(appointment.date, today)) {
        throw new Error("Cannot book appointments for past dates.");
      }

      await axios.post("/api/bookings", {
        email: session?.user?.email,
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
      });

      setLoading(false);
      setShowSuccess(true);
      onClose();
    } catch (error) {
      setLoading(false);
      onClose();
      if (axios.isAxiosError(error)) {
        setErrorMessage(`${error.response?.data?.message || error.message}`);
      } else {
        setErrorMessage(
          `An unexpected error occurred: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
      setShowError(true);
    }
  };

  const formattedDate = appointment.date
    ? format(appointment.date, "MMMM do, yyyy")
    : "";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Booking Confirmation</DialogTitle>
          <DialogDescription>
            <p>
              <strong>Name:</strong> {appointment.name}
            </p>
            <p>
              <strong>Email:</strong> {appointment.email}
            </p>
            <p>
              <strong>Date:</strong> {formattedDate}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p>
              <strong>Service:</strong> {appointment.service.service} -{" "}
              {appointment.service.price !== "Negotiable" && "₦"}
              {appointment.service.price}
            </p>
          </DialogDescription>
          <div>
            <Button
              onClick={handleBooking}
              className="bg-[#028391] text-white"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Go Ahead"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <SuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      <ErrorDialog
        isOpen={showError}
        onClose={() => setShowError(false)}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default BookingConfirmationDialog;
