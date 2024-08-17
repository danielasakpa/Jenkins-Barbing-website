import React from "react";
import Section from "./Section";
import { prices } from "@/constants";

const Pricing = () => {
  return (
    <Section className="md:mt-16 md:py-20 px-6 md:px-0 flex flex-col items-center justify-center text-center">
      <div className="md:w-[50%] flex flex-col items-center justify-center">
        <span className="text-[#DC5F00]">PRICING TABLE</span>
        <h1 className="h1-bold">Pricing plans</h1>
        <p className="mt-4 p-regular-18">
          There is a distinction between a beauty salon and a hair salon and
          although many small businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:px-16 mt-12">
        {prices.map((price) => (
          <div className="p-2" key={price.id}>
            <span className="flex flex-col md:flex-row items-center p-medium-20">
              <span className="md:h4-medium text1 whitespace-nowrap">
                {price.service}
              </span>
              <span className="hidden md:block border-b-2 border-black border-dashed w-[100%] h-[1px] mx-4">
                &nbsp;
              </span>{" "}
              <span className="md:h4-medium text1">
                {!price.Negotiable ? "₦" : null}
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
