"use client";

import React from "react";
import Section from "./Section";
import { useServices } from "@/context/ServicesContext";

const Pricing = () => {
  const { services } = useServices();

  return (
    <Section className="mt-8 lg:py-24 px-6 md:px-0 flex flex-col items-center justify-center text-center">
      <div className="relative max-w-3xl flex flex-col items-center justify-center space-y-4 mb-16">
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-semibold text-[#028391]">
            TRANSPARENT PRICING
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold">
          Our
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#028391] to-cyan-600">
            Pricing Plans
          </span>
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Affordable services with no compromise on quality. Choose a plan that
          suits your style and budget.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:px-16 mt-12">
        {services.map((price) => (
          <div className="p-2" key={price.id}>
            <span className="flex flex-col md:flex-row items-center p-medium-20">
              <span className="md:h4-medium text1 whitespace-nowrap">
                {price.service}
              </span>
              <span className="hidden md:block border-b-2 border-black border-dashed w-[100%] h-[1px] mx-4">
                &nbsp;
              </span>{" "}
              <span className="md:h4-medium text1">
                {!price.negotiable ? "₦" : null}
                {price.price}
              </span>
            </span>
            <p className="md:text-left mt-3">{price.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Pricing;
