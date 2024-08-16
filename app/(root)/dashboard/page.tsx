"use client";

import React from "react";
import BookingsTable from "@/components/Shared/BookingTable";
import { useBookings } from "@/hooks/useBookings";

const Page = () => {
  const {
    bookings,
    deletingBookingId,
    closingBookingId,
    handleDelete,
    handleClose,
  } = useBookings(true);

  return (
    <div className="pt-28">
      <div className="mb-8 px-3">
        <h2 className="text-2xl font-bold mb-4">Booking Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-medium">Total Bookings</h3>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-medium">Open Bookings</h3>
            <p className="text-2xl font-bold">
              {
                bookings.filter(
                  (booking) => booking.status.toLowerCase() === "open"
                ).length
              }
            </p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-medium">Closed Bookings</h3>
            <p className="text-2xl font-bold">
              {
                bookings.filter(
                  (booking) => booking.status.toLowerCase() === "closed"
                ).length
              }
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100vw] md:w-full overflow-scroll md:overflow-hidden px-2">
        <BookingsTable
          bookings={bookings}
          handleDelete={handleDelete}
          handleClose={handleClose}
          deletingBookingId={deletingBookingId}
          closingBookingId={closingBookingId}
        />
      </div>
    </div>
  );
};

export default Page;
