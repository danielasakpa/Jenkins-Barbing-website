import About from "@/components/Shared/About";
import Button from "@/components/Shared/Button";
import Hero from "@/components/Shared/Hero";
import InfiniteMovingCardsDemo from "@/components/Shared/InfiniteMovingCards";
import Pricing from "@/components/Shared/Pricing";
import Section from "@/components/Shared/Section";
import Services from "@/components/Shared/Services";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Services />
      <Pricing />
      <div className="bg-black">
        <Section className="mt-16 py-20 px-4 md:px-0 flex flex-col items-center justify-center text-center">
          <div className="md:w-[50%] flex flex-col items-center justify-center text-white">
            <span className="text-[#DC5F00]">THE JENKINS SALON</span>
            <h1 className="h1-bold">
              Revitalize your senses and Refresh your mind.
            </h1>
            <p className="mt-4 p-regular-18">
              There is a distinction between a beauty salon and a hair salon and
              although many small businesses do offer both sets of treatments.
            </p>
          </div>

          <Button
            className="mt-8 w-[max-content] hidden lg:flex bg-[#DC5F00] text-white"
            href="#login"
          >
            MAKE AN APPOINTMENT
          </Button>
        </Section>
      </div>

      <Section className="mt-16 md:mb-10 py-20 px-4 md:px-0 flex flex-col items-center justify-center text-center">
        <div className="md:w-[50%] flex flex-col items-center justify-center mb-4">
          <span className="text-[#DC5F00]">TESTIMONIALS</span>
          <h1 className="h1-bold">Hear from our customers</h1>
          <p className="mt-4 p-regular-18">
            There is a distinction between a beauty salon and a hair salon and
            although many small businesses.
          </p>
        </div>
        <InfiniteMovingCardsDemo />
      </Section>
    </div>
  );
}
