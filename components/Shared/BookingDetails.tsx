"use client";

import BookingForm from "@/components/Shared/BookingForm";
import Image from "next/image";
import { format } from "date-fns";
import { useBooking } from "@/context/BookingContext";

const BookingDetails = () => {
  const { date, time, selectedService } = useBooking();

  const formattedDate = date ? format(date, "MMMM do, yyyy") : "";

  return (
    <div className="flex flex-col md:flex-row my-10 md:px-16">
      <div className="basis-1/2 order-last md:order-first mt-6 lg:mt-0">
        <BookingForm />
      </div>
      <div className="basis-1/2 flex justify-center px-4 mb-4 md:mb-0">
        <div className="w-[400px] flex flex-col gap-2">
          <div className="flex justify-center items-center rounded-lg cursor-pointer">
            <Image
              className="object-cover h-[400px] w-[400px] rounded-lg "
              src={`/${selectedService.service}.jpg`}
              height={400}
              width={400}
              alt={`${selectedService.service}`}
            />
          </div>
          <span>
            Service: {selectedService.service} -{" "}
            {!selectedService.Negotiable && "₦"}
            {selectedService.price}
          </span>
          <span>Date: {formattedDate}</span>
          <span>Time: {time}</span>
          <p className="break-words">Desc: {selectedService.desc}</p>
          <span>
            Negotiable:{" "}
            <span
              className={`${
                selectedService.Negotiable ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedService.Negotiable ? "true" : "false"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
