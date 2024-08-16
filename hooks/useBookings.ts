import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Booking } from "@/types";

export const useBookings = (isAdmin: boolean) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(
    null
  );
  const [closingBookingId, setClosingBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      if (status === "loading") return;
      if (!isAdmin && !session?.user?.email) {
        setError("User email is not available");
        return;
      }

      setLoading(true);

      try {
        const url = isAdmin
          ? "/api/bookings"
          : `/api/bookings/user?email=${encodeURIComponent(
              session?.user?.email || ""
            )}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        const now = new Date();
        const updatedBookings = data.bookings.map((booking: Booking) => {
          const bookingDate = new Date(booking.date);
          const isExpired =
            bookingDate < now && booking.status !== "Closed"
              ? "Expired"
              : booking.status;
          return { ...booking, status: isExpired };
        });
        const sortedBookings = updatedBookings.sort(
          (a: Booking, b: Booking) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBookings(sortedBookings);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAdmin, session?.user?.email, status]);

  const handleDelete = async (bookingId: string) => {
    setDeletingBookingId(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete booking.");
      }
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      toast({
        description: "Booking deleted successfully.",
        variant: "default",
        className: "bg-green-600 text-white",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({ description: errorMessage, variant: "destructive" });
    } finally {
      setDeletingBookingId(null);
    }
  };

  const handleClose = async (bookingId: string, updates: Partial<Booking>) => {
    setClosingBookingId(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error("Failed to update booking.");
      }
      const updatedBooking = await response.json();
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, ...updatedBooking } : booking
        )
      );
      toast({
        description: "Booking closed successfully.",
        variant: "default",
        className: "bg-green-600 text-white",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({ description: errorMessage, variant: "destructive" });
    } finally {
      setClosingBookingId(null);
    }
  };

  return {
    bookings,
    deletingBookingId,
    closingBookingId,
    error,
    loading,
    handleDelete,
    handleClose,
  };
};
