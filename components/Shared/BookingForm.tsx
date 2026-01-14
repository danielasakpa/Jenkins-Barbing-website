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
import { startOfDay, isBefore, format } from "date-fns";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Check,
} from "lucide-react";

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
    service: Service | undefined;
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
  const formattedDate = date ? format(date, "MMMM do, yyyy") : "";

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-6 mb-12">
      {/* Booking Form */}
      <div className="w-full lg:w-[40%] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h3>
          <p className="text-gray-600">
            Fill in your details to reserve your slot
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-gray-700"
            >
              <User className="w-4 h-4 text-[#028391]" />
              Full Name
            </Label>
            <Input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#028391] focus:ring-2 focus:ring-[#028391]/20 transition-all duration-200"
              id="name"
              disabled={session?.user ? true : false}
              placeholder={`${session?.user?.name || "Enter your name"}`}
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 text-gray-700"
            >
              <Mail className="w-4 h-4 text-[#028391]" />
              Email Address
            </Label>
            <Input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#028391] focus:ring-2 focus:ring-[#028391]/20 transition-all duration-200"
              id="email"
              disabled={session?.user ? true : false}
              placeholder={`${session?.user?.email || "Enter your email"}`}
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
              <CalendarIcon className="w-4 h-4 text-[#028391]" />
              Select Date
            </Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl border-2 border-gray-200 p-3 w-fit"
              disabled={(date) => isBefore(date, today)}
              fromDate={today}
            />
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-[#028391]" />
              Select Time
            </Label>
            <TimeInput
              time={time}
              setTime={setTime}
              bookedTimes={bookedTimes}
            />
          </div>

          {/* Service Select */}
          <ServiceSelect
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Confirm Booking
          </button>
        </form>
      </div>

      {/* Booking Preview */}
      <div className="w-full lg:w-[60%]">
        {!selectedService ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
            <div className="animate-pulse space-y-4">
              <div className="bg-gray-200 h-72 rounded-xl"></div>
              <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
              <div className="bg-gray-200 h-6 w-2/3 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 sticky top-24 w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Booking Summary
            </h3>

            {/* Service Image */}
            <div className="relative rounded-xl overflow-hidden mb-6 group">
              <Image
                className="object-cover w-full h-72 transition-transform duration-500 group-hover:scale-110"
                src={selectedService.imageUrl}
                height={256}
                width={400}
                alt={`${selectedService.service}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-xl font-bold text-white">
                  {selectedService.service}
                </h4>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#028391]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#028391]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="font-semibold text-gray-900">
                    {!selectedService.negotiable && "₦"}
                    {selectedService.price}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#028391]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-5 h-5 text-[#028391]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">
                    {formattedDate || "Select a date"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-[#028391]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#028391]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Time</p>
                  <p className="font-semibold text-gray-900">
                    {time || "Select a time"}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed">
                  {selectedService.desc}
                </p>
              </div>

              {selectedService.negotiable && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Price is negotiable
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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
