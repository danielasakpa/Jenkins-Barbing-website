"use client";

import { useServices } from "@/context/ServicesContext";
import { Service } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

interface BookingContextType {
  date: Date | undefined;
  time: string;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  selectedService: Service | undefined;
  setSelectedService: React.Dispatch<React.SetStateAction<Service | undefined>>;
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
  const { services } = useServices();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("09:00");
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    services[0]
  );

  useEffect(() => {
    if (services.length > 0 && !selectedService) {
      setSelectedService(services[0]);
    }
  }, [services, selectedService]);

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
