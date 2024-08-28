import React from "react";
import Section from "@/components/Shared/Section";

const About = () => {
  return (
    <Section className="py-24 lg:py-32">
      <div className="container grid gap-12 px-6 md:px-14 lg:grid-cols-2 lg:gap-20">
        <div className="text-left lg:text-center flex flex-col justify-center  space-y-6">
          <h1 className="h1-bold text-4xl lg:text-5xl">About us</h1>
          <p className="mt-4 p-regular-18 max-w-2xl text-left">
            Jenkins Haircut is where style meets skill. With over a decade of
            experience, Jenkins delivers sharp cuts and a welcoming vibe that
            keeps clients coming back. Our passion for precision and attention
            to detail ensures that every haircut is a masterpiece. Whether
            you're looking for a classic cut or the latest trend, we're
            dedicated to enhancing your unique style. Step into our chair and
            experience the difference – where your look is our passion, and your
            satisfaction is our priority.
          </p>
        </div>
        <div className="flex justify-center items-center mt-12 lg:mt-0">
          <div className="relative">
            <img
              src="/about6.jpg"
              alt="Jenkins Haircut"
              width="500"
              height="500"
              className="rounded-lg shadow-lg object-cover"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "500px",
                aspectRatio: "1/1",
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
