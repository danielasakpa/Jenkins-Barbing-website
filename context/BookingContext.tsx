"use client";

import { prices } from "@/constants";
import React, { createContext, useContext, useState } from "react";

interface PriceItem {
  id: number;
  service: string;
  price: string;
  desc: string;
  Negotiable?: boolean;
}

interface BookingContextType {
  date: Date | undefined;
  time: string;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  selectedService: PriceItem;
  setSelectedService: React.Dispatch<React.SetStateAction<PriceItem>>;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("09:00");
  const [selectedService, setSelectedService] = useState<PriceItem>(prices[0]);

  return (
    <BookingContext.Provider
      value={{
        date,
        time,
        setDate,
        setTime,
        selectedService,
        setSelectedService,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
