import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServices } from "@/context/ServicesContext";
import { Service } from "@/types";

interface ServiceSelectProps {
  selectedService: Service | undefined;
  setSelectedService: (service: Service) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({
  selectedService,
  setSelectedService,
}) => {
  const { services } = useServices();

  return (
    <label className="block mt-2">
      Select Service:
      <Select
        onValueChange={(value) => {
          const selected = services.find(
            (service) => service.service === value
          );
          setSelectedService(selected || services[0]);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={`${selectedService?.service} - ${
              selectedService?.price !== "Negotiable" && "₦"
            } ${selectedService?.price}`}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {services.map((service) => (
              <SelectItem key={service.service} value={service.service}>
                {service.service} - {service.price !== "Negotiable" && "₦"}
                {service.price}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </label>
  );
};

export default ServiceSelect;
