import Link from "next/link";
import BookingDetails from "@/components/Shared/BookingDetails";
import Section from "@/components/Shared/Section";

const Page = () => {
  return (
    <div className="w-full">
      <Section className="relative bg-black px-6 md:px-0 lg:!mt-8 mb-16 md:mb-24 h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="h2-bold lg:h1-large text-white mt-10">Online Booking</h1>
        <span className="p-medium-16 p-medium-20 text-white text">
          Get the Perfect Cut or Shave – Book Your Appointment Online in Just a
          Few Clicks
        </span>

        <span className="p-medium-14 lg:p-medium-16 text-white bg-gray2 bg-opacity-20 px-4 py-2 rounded-sm">
          <Link href={"/"} className="hover:text-yellow">
            Home
          </Link>{" "}
          / <span className="text-[#DC5F00]">About Us</span>
        </span>
        <div className="absolute bg-black h-full w-full-z-10" />
      </Section>
      <h2 className="h3-bold lg:h2-bold font-bold text-center mb-16 mx-4 md:mx-0">
        Book a Barbing Session
      </h2>
      <BookingDetails />
    </div>
  );
};

export default Page;
