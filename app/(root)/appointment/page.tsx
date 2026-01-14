import Link from "next/link";
import BookingDetails from "@/components/Shared/BookingDetails";
import Section from "@/components/Shared/Section";

const Page = () => {
  return (
    <div className="w-full">
      {/* Hero Section with Modern Gradient */}
      <Section className="relative max-w-full w-full bg-gradient-to-br from-black via-gray-900 to-black px-6 md:px-8 lg:!mt-8 mb-20 md:!mb-32 min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#028391]/20 rounded-full blur-[120px]"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#028391] bg-[#028391]/10 border border-[#028391]/20 rounded-full">
            EASY BOOKING
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Online Booking
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get the Perfect Cut or Shave – Book Your Appointment Online in Just a Few Clicks
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-800 w-max mx-auto">
            <Link href="/" className="hover:text-[#028391] transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#028391] font-semibold">Appointment</span>
          </div>
        </div>
      </Section>

      {/* Booking Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#028391] to-cyan-600"> Session</span>
          </h2>
          <p className="text-gray-600 text-lg">Choose your preferred service, date, and time</p>
        </div>
        
        <BookingDetails />
      </div>
    </div>
  );
};

export default Page;