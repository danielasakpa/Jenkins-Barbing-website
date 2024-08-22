"use client";

import BookingForm from "@/components/Shared/BookingForm";
import Image from "next/image";
import { format } from "date-fns";
import { useBooking } from "@/context/BookingContext";

const BookingDetails = () => {
  const { date, time, selectedService } = useBooking();

  if (!selectedService) {
    return (
      <div className="flex flex-col md:flex-row mt-6 mb-12 md:px-16">
        <div className="basis-1/2 order-last md:order-first mt-6 lg:mt-0">
          <BookingForm />
        </div>
        <div className="basis-1/2 flex justify-center px-4 mb-4 md:mb-0">
          <div className="w-[400px] flex flex-col gap-2">
            {/* Loading Placeholder for Image */}
            <div className="animate-pulse bg-gray-300 h-[400px] max-w-[400px] rounded-lg mb-3" />

            {/* Loading Placeholder for Text */}
            <span className="animate-pulse bg-gray-300 h-6 w-1/2 rounded-md mb-2" />
            <span className="animate-pulse bg-gray-300 h-6 w-1/4 rounded-md mb-2" />
            <span className="animate-pulse bg-gray-300 h-6 w-1/3 rounded-md mb-2" />
            <span className="animate-pulse bg-gray-300 h-6 w-2/3 rounded-md mb-2" />
            <span className="animate-pulse bg-gray-300 h-6 w-1/4 rounded-md mb-2" />
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = date ? format(date, "MMMM do, yyyy") : "";

  console.log(selectedService.imageUrl);
  return (
    <div className="flex flex-col md:flex-row mt-6 mb-12 md:px-16">
      <div className="basis-1/2 order-last md:order-first mt-6 lg:mt-0">
        <BookingForm />
      </div>
      <div className="basis-1/2 flex justify-center px-4 mb-4 md:mb-0">
        <div className="w-[400px] flex flex-col gap-2">
          <div className="flex justify-center items-center rounded-lg cursor-pointer">
            <Image
              className="object-cover h-[350px] w-[400px] rounded-lg mb-3"
              src={selectedService.imageUrl}
              height={350}
              width={400}
              alt={`${selectedService.service}`}
            />
          </div>
          <span>
            Service: {selectedService.service} -{" "}
            {!selectedService.negotiable && "₦"}
            {selectedService.price}
          </span>
          <span>Date: {formattedDate}</span>
          <span>Time: {time}</span>
          <p className="break-words">Desc: {selectedService.desc}</p>
          <span>
            Negotiable:{" "}
            <span
              className={`${
                selectedService.negotiable ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedService.negotiable ? "true" : "false"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
