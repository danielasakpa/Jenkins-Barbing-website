import React from "react";
import Section from "@/components/Shared/Section";
import Gallery from "./Gallery";

const About = () => {
  return (
    <Section>
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-36">
        <div className="text-center flex flex-col justify-center items-center">
          <span className="text-[#DC5F00]">INTRODUCING</span>
          <h1 className="h1-bold">The Jenkins salon since 1991 </h1>
          <p className="mt-4 p-regular-18">
            There is a distinction between a beauty salon and a hair salon and
            although many small businesses do offer both sets of treatments;
            beauty salons provide extended services related to skin health
          </p>
        </div>
        <div className="flex items-start justify-center relative mt-28 lg:mt-0">
          <Gallery />
          <div className="relative lg:hidden">
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[250px] h-[250px] bg-[#DC5F00] rounded-full" />
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[300px] h-[300px] bg-[#222324] rounded-full" />
            <img
              src="/about.jpg"
              alt="Geometric Shapes"
              width="400"
              height="400"
              className="relative z-10 rounded-lg shadow-lg"
              style={{ aspectRatio: "400/400", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
