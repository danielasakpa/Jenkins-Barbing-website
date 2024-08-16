"use client";

import React from "react";
import { useSession } from "next-auth/react";
import BookingsTable from "@/components/Shared/BookingTable";
import { Loader2 } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";

const Page = () => {
  const { data: session, status } = useSession();
  const { bookings, deletingBookingId, error, loading, handleDelete } =
    useBookings(false);

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <Loader2 className="animate-spin h-8 w-8 text-black" />
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalBookings = bookings.length;
  const mostFrequentService = bookings.reduce((acc, curr) => {
    acc[curr.service.service] = (acc[curr.service.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostBookedService =
    totalBookings > 0
      ? Object.keys(mostFrequentService).reduce((a, b) =>
          mostFrequentService[a] > mostFrequentService[b] ? a : b
        )
      : "";

  return (
    <div className="mt-36">
      <div className="px-4">
        <h1>Welcome, {session?.user?.name}</h1>
        <p>Email: {session?.user?.email}</p>

        <div className="mt-8">
          <h2>Booking Statistics</h2>
          <p>Total Bookings: {totalBookings}</p>
          {totalBookings > 0 && (
            <p>
              Most Booked Service: {mostBookedService} (
              {mostFrequentService[mostBookedService]} times)
            </p>
          )}
        </div>
      </div>

      <div className="w-[100vw] md:w-full overflow-scroll md:overflow-hidden px-2">
        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          <div className="pt-16 pb-8">
            <BookingsTable
              bookings={bookings}
              handleDelete={handleDelete}
              deletingBookingId={deletingBookingId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
