// components/ServiceSelect.tsx

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prices } from "@/constants";
import { Service } from "@/types";

interface ServiceSelectProps {
  selectedService: Service;
  setSelectedService: (service: Service) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({
  selectedService,
  setSelectedService,
}) => {
  return (
    <label className="block mt-2">
      Select Service:
      <Select
        onValueChange={(value) => {
          const selected = prices.find((price) => price.service === value);
          setSelectedService(selected || prices[0]);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={`${selectedService.service} - ${
              selectedService.price !== "Negotiable" && "₦"
            } ${selectedService.price}`}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {prices.map((service) => (
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
