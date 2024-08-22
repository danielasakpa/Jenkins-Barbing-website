"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Service } from "@/types";
import { useToast } from "@/components/ui/use-toast";

type ServicesContextType = {
  services: Service[];
  loading: boolean;
  updateService: (id: string, updatedData: Partial<Service>) => void;
  createService: (newService: Service) => void;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  deleteService: (id: string) => void;
};

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined
);

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/services");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const services = await response.json();
        setServices(services.services);
      } catch (error) {
        toast({
          description: `An error occurred while fetching services.`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const createService = async (newService: Service) => {
    setLoading(true);
    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: newService.service,
          price: newService.negotiable ? "Negotiable" : newService.price,
          desc: newService.desc,
          negotiable: newService.negotiable,
          imageUrl: newService.imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create service:", errorData.message);
        return;
      }

      const data = await response.json();

      toast({
        description: "Service created successfully.",
        variant: "default",
        className: "bg-green-600 text-white",
      });

      setServices((prevServices) => [...prevServices, data.service]);
    } catch (error) {
      toast({
        description: `An error occurred while creating the service.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, updatedData: Partial<Service>) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update service:", errorData.message);
        return;
      }

      const data = await response.json();

      toast({
        description: "Service updated successfully.",
        variant: "default",
        className: "bg-green-600 text-white",
      });

      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, ...data.service } : service
        )
      );
    } catch (error) {
      toast({
        description: `An error occurred while updating the service.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete service:", errorData.message);
        return;
      }

      const data = await response.json();

      toast({
        description: "Service deleted successfully.",
        variant: "default",
        className: "bg-green-600 text-white",
      });

      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
    } catch (error) {
      toast({
        description: `An error occurred while deleting the service.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        loading,
        updateService,
        deleteService,
        setServices,
        createService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
