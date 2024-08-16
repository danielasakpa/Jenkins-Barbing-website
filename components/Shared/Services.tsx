import React from "react";
import Section from "@/components/Shared/Section";
import ServicesCard from "./ServicesCard";
import { services } from "@/constants";

const Services = () => {
  return (
    <Section className=" md:mt-56 py-20 px-10 md:px-20 flex flex-col items-center justify-center text-center">
      <div className="lg:w-[50%] flex flex-col items-center justify-center">
        <span className="text-[#DC5F00]">SERVICES</span>
        <h1 className="h1-bold">Our services</h1>
        <p className="mt-4 p-regular-18">
          There is a distinction between a beauty salon and a hair salon and
          although many small businesses.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 md:gap-4 justify-items-center">
        {services.map((service, index) => (
          <ServicesCard key={index} service={service} />
        ))}
      </div>
    </Section>
  );
};

export default Services;
