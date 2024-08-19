import React from "react";
import Section from "@/components/Shared/Section";

const About = () => {
  return (
    <Section className="py-24 lg:py-28">
      <div className="container grid gap-6 px-6 md:px-14 lg:grid-cols-2 lg:gap-14">
        <div className="text-center flex flex-col justify-center items-center lg:order-2">
          <span className="text-[#028391] mb-3 font-semibold">INTRODUCING</span>
          <h1 className="h1-bold">Jenkins Haircut</h1>
          <p className="mt-4 p-regular-18">
            Jenkins Haircut is where style meets skill. With years of
            experience, Jenkins delivers sharp cuts and a welcoming vibe. Your
            look, our passion
          </p>
        </div>
        <div className="flex relative mt-10 lg:mt-0">
          <div className="relative ">
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
