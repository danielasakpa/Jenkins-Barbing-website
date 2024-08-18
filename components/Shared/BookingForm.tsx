"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TimeInput from "./TimeInput";
import ServiceSelect from "./ServiceSelect";
import AuthenticationDialog from "./AuthenticationDialog";
import BookingConfirmationDialog from "./BookingConfirmationDialog";
import { useBooking } from "@/context/BookingContext";
import { useSession } from "next-auth/react";
import { Service } from "@/types";
import axios from "axios";
import { startOfDay, isBefore } from "date-fns";

const BookingForm = () => {
  const { date, time, setDate, setTime, selectedService, setSelectedService } =
    useBooking();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [appointment, setAppointment] = useState<{
    name: string;
    email: string;
    date: Date | undefined;
    time: string;
    service: Service;
  } | null>(null);

  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (date) {
      axios
        .get(`/api/booked-times?date=${date.toISOString()}`)
        .then((response) => setBookedTimes(response.data.bookedTimes))
        .catch((error) => console.error(error));
    }
  }, [date]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = startOfDay(new Date());
    if (!date || isBefore(date, today)) {
      alert("Please select a valid date (today or a future date).");
      return;
    }

    if (!session) {
      setAuthDialogOpen(true);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const newAppointment = {
      name: session?.user?.name || name,
      email: session?.user?.email || email,
      date: date,
      time: time,
      service: selectedService,
    };

    setAppointment(newAppointment);
    setConfirmDialogOpen(true);
  };

  const handleCloseAuthDialog = () => setAuthDialogOpen(false);
  const handleCloseConfirmDialog = () => setConfirmDialogOpen(false);

  const today = startOfDay(new Date());

  return (
    <div className="container mx-auto lg:px-4 w-max">
      <form onSubmit={handleSubmit} className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          required
          className="mt-1 block w-full border"
          id="name"
          disabled={session?.user ? true : false}
          placeholder={`${session?.user?.name || "Name"}`}
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          required
          className="mt-1 block w-full border"
          id="email"
          disabled={session?.user ? true : false}
          placeholder={`${session?.user?.email || "Email"}`}
        />
        <label className="block mt-2">
          Select Date:
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => isBefore(date, today)}
            fromDate={today}
          />
        </label>
        <TimeInput time={time} setTime={setTime} bookedTimes={bookedTimes} />
        <ServiceSelect
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#028391] rounded-sm text-white"
        >
          Book Now
        </button>
      </form>
      <AuthenticationDialog
        isOpen={authDialogOpen}
        onClose={handleCloseAuthDialog}
      />
      {appointment && (
        <BookingConfirmationDialog
          isOpen={confirmDialogOpen}
          onClose={handleCloseConfirmDialog}
          appointment={appointment}
        />
      )}
    </div>
  );
};

export default BookingForm;
