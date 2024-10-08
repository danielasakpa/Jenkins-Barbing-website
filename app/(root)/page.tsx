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
        <Section className="mt-16 !py-[100px] px-4 md:px-0 flex flex-col items-center justify-center text-center">
          <div className="md:w-[50%] flex flex-col items-center justify-center text-white">
            <span className="text-[#028391] mb-3 font-semibold">
              THE JENKINS HAIRCUT
            </span>
            <h1 className="h1-bold">
              Revitalize your senses and Refresh your mind.
            </h1>
            <p className="mt-4 p-regular-18">
              At Jenkins Haircut, we offer more than just a haircut. Refresh
              your mind and revitalize your senses in a relaxing atmosphere,
              leaving you looking sharp and feeling renewed.
            </p>
          </div>

          <Button
            className="mt-8 w-[max-content] flex bg-[#028391] rounded-sm text-white"
            href="/appointment"
          >
            BOOK AN APPOINTMENT
          </Button>
        </Section>
      </div>

      <Section className="mt-16 md:mb-10 py-20 px-4 md:px-0 flex flex-col items-center justify-center text-center">
        <div className="md:w-[50%] flex flex-col items-center justify-center mb-4">
          <span className="text-[#028391] mb-3 font-semibold">
            TESTIMONIALS
          </span>
          <h1 className="h1-bold">Hear from our customers</h1>
          <p className="mt-4 p-regular-18">
            Don&apos;t just take our word for it—hear what our clients have to
            say about their experience at Jenkins Haircut
          </p>
        </div>
        <InfiniteMovingCardsDemo />
      </Section>
    </div>
  );
}
