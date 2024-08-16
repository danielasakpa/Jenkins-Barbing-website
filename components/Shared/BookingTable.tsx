"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Booking } from "@/types";
import { Button } from "../ui/button";

interface BookingsTableProps {
  bookings: Booking[];
  handleDelete: (bookingId: string) => void;
  handleClose?: (bookingId: string, updates: Partial<Booking>) => void;
  deletingBookingId?: string | null;
  closingBookingId?: string | null;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  handleDelete,
  handleClose,
  deletingBookingId,
  closingBookingId,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.user.name}</TableCell>
            <TableCell>{booking.service.service}</TableCell>
            <TableCell>
              {booking.service.price !== "Negotiable" && "₦"}
              {booking.service.price}
            </TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.time}</TableCell>
            <TableCell>{booking.status}</TableCell>
            <TableCell className="flex gap-3">
              {handleClose && (
                <Button
                  onClick={() => handleClose(booking.id, { status: "Closed" })}
                  className="bg-blue-500 text-white hover:text-blue-700 hover:bg-transparent !p-1 rounded-sm cursor-pointer"
                  disabled={
                    closingBookingId === booking.id ||
                    booking.status === "Expired" ||
                    booking.status === "Closed"
                  }
                >
                  <div className="w-16 flex justify-center">
                    {closingBookingId === booking.id ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Close"
                    )}
                  </div>
                </Button>
              )}
              <Button
                onClick={() => handleDelete(booking.id)}
                className="bg-red-500 text-white hover:text-red-700 hover:bg-transparent !p-1 rounded-sm cursor-pointer"
                disabled={
                  deletingBookingId === booking.id ||
                  booking.status === "Expired" ||
                  booking.status === "Closed"
                }
              >
                <div className="w-16 flex justify-center">
                  {deletingBookingId === booking.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Cancel"
                  )}
                </div>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;
