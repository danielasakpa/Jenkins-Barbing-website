import React from "react";
import Section from "@/components/Shared/Section";
import ServicesCard from "./ServicesCard";
import { services } from "@/constants";

const Services = () => {
  return (
    <Section className="md:mt-56 lg:py-20 px-4 md:px-20 flex flex-col items-center justify-center text-center">
      <div className="lg:w-[50%] flex flex-col items-center justify-center">
        <span className="text-[#DC5F00] mb-3">SERVICES</span>
        <h1 className="h1-bold">Our services</h1>
        <p className="mt-4 p-regular-18">
          At JenkinsIt&apos;s Haircut, we offer a range of grooming services to
          keep you looking your best. Whether you're after a classic cut or a
          fresh new style, our skilled barbers are here to deliver.
        </p>
      </div>

      <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 md:gap-4 justify-items-center">
        {services.map((service, index) => (
          <ServicesCard key={index} service={service} />
        ))}
      </div>
    </Section>
  );
};

export default Services;
