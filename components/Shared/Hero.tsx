import React from "react";
import Image from "next/image";
import Button from "./Button";
import Section from "./Section";

const Hero = () => {
  return (
    <Section className="w-full flex justify-center items-center md:px-4 lg:h-screen py-32 lg:mt-[40px]">
      <div className="grid place-items-center gap-14 px-4 md:px-6 grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <h1 className="h1-large font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Our Hair Styles Enhance Your Smile
          </h1>
          <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            There is a distinction between a beauty salon and a hair salon and
            although many small businesses.
          </p>
          <Button
            href="/appointment"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#DC5F00] px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Make a appointment
          </Button>
        </div>
        <Image
          src="/hero1.jpg"
          width="550"
          height="400"
          alt="Hero Image"
          className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full"
        />
      </div>
    </Section>
  );
};

export default Hero;
