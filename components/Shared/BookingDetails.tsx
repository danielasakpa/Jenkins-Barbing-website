"use client";

import BookingForm from "@/components/Shared/BookingForm";
import { useBooking } from "@/context/BookingContext";

const BookingDetails = () => {
  const { selectedService } = useBooking();

  if (!selectedService) {
    return (
      <div className="flex flex-col md:flex-row mt-6 mb-12 md:px-16">
        <div className="basis-1/2 order-last md:order-first mt-6 lg:mt-0">
          <BookingForm />
        </div>
       
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-6 mb-12 md:px-16">
      <div className=" mt-6 lg:mt-0">
        <BookingForm />
      </div>
    </div>
  );
};

export default BookingDetails;
