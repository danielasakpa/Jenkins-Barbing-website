import React from "react";
import Section from "@/components/Shared/Section";
import Gallery from "./Gallery";

const About = () => {
  return (
    <Section className="py-24 lg:py-36">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-36">
        <div className="text-center flex flex-col justify-center items-center">
          <span className="text-[#DC5F00] mb-3">INTRODUCING</span>
          <h1 className="h1-bold">About Jenkins's Haircut</h1>
          <p className="mt-4 p-regular-18">
            Jenkins's Haircut is where style meets skill. With years of
            experience, Jenkins delivers sharp cuts and a welcoming vibe. Your
            look, our passion
          </p>
        </div>
        <div className="flex items-start justify-center relative mt-10 lg:mt-0">
          <Gallery />
          <div className="relative lg:hidden">
            <img
              src="/about6.jpg"
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
