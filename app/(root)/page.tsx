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
      
      {/* Modern CTA Section with Gradient */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <Section className="relative mt-16 !py-[120px] px-6 md:px-8 flex flex-col items-center justify-center text-center">
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#028391]/20 rounded-full blur-[120px]"></div>
          
          <div className="relative max-w-3xl flex flex-col items-center justify-center text-white space-y-6">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#028391] bg-[#028391]/10 border border-[#028391]/20 rounded-full">
              THE JENKINS EXPERIENCE
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Revitalize Your Senses,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#028391] to-cyan-300">
                Refresh Your Mind
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              At Jenkins Haircut, we offer more than just a haircut. Refresh your mind and revitalize your senses in a relaxing atmosphere, leaving you looking sharp and feeling renewed.
            </p>

            <Button
              className="mt-8 px-8 py-4 bg-gradient-to-r from-[#028391] to-cyan-600 hover:from-[#026d7a] hover:to-cyan-700 rounded-lg text-white font-semibold text-lg shadow-lg shadow-[#028391]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#028391]/40"
              href="/appointment"
            >
              BOOK AN APPOINTMENT
            </Button>
          </div>
        </Section>
      </div>

      {/* Modern Testimonials Section */}
      <Section className="mt-20 mb-20 md:mt-32 md:mb-20 py-20 px-6 md:px-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl flex flex-col items-center justify-center mb-8 md: space-y-4">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#028391] bg-[#028391]/10 border border-[#028391]/20 rounded-full">
            TESTIMONIALS
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            Hear From Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#028391] to-cyan-600">
              Happy Clients
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Don't just take our word for it—discover what our clients have to say about their exceptional experience at Jenkins Haircut
          </p>
        </div>
        
        <InfiniteMovingCardsDemo />
      </Section>
    </div>
  );
}