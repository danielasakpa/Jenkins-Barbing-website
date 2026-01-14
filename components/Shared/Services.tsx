"use client";

import React from "react";
import Section from "@/components/Shared/Section";
import ServicesCard from "./ServicesCard";
import { useServices } from "@/context/ServicesContext";

const Services = () => {
  const { services } = useServices();

  return (
    <Section className="px-4 md:px-20 flex flex-col items-center justify-center text-center">
      <div className="relative max-w-3xl flex flex-col items-center justify-center space-y-4 mb-8">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#028391]/10 border border-[#028391]/20 rounded-full">
          <svg
            className="w-4 h-4 text-[#028391]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.952-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-semibold text-[#028391]">
            WHAT WE OFFER
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold">
          Our
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#028391] to-cyan-600">
            Premium Services
          </span>
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          At Jenkins Haircut, we offer a range of grooming services to keep you
          looking your best. Whether you're after a classic cut or a fresh new
          style, our skilled barbers are here to deliver.
        </p>
      </div>

      <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 md:gap-4 justify-items-center">
        {services.slice(0, 11).map((service) => (
          <ServicesCard key={service.id} service={service} />
        ))}
      </div>
    </Section>
  );
};

export default Services;
