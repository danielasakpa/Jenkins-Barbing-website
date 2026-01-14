import React from "react";
import Image from "next/image";
import Button from "./Button";
import Section from "./Section";

const Hero = () => {
  return (
    <Section className="relative max-w-full mb-0 w-full flex justify-center items-center px-4 md:px-6 min-h-screen pt-32 lg:mt-0 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] w-full"></div>
      
      {/* Gradient Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#028391]/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative grid place-items-center gap-12 lg:gap-16 grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="space-y-8 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#028391]/10 border border-[#028391]/20 rounded-full">
            <span className="w-2 h-2 bg-[#028391] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-[#028391]">
              Premium Barbershop Experience
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Look Sharp,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#028391] to-cyan-600">
              Feel Confident
            </span>
            <br />
            with the Perfect Cut
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Expert cuts, personalized styles, and a welcoming atmosphere. Our hair styles enhance your smile and boost your confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              href="/appointment"
              className="group px-8 py-4 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                BOOK AN APPOINTMENT
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
            
            <Button
              href="/gallery"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-xl hover:border-[#028391] hover:text-[#028391] transition-all duration-300"
            >
              VIEW GALLERY
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-[#028391]">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-[#028391]">5K+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-[#028391]">4.9</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative group">
          {/* Decorative Background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#028391] to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          
          {/* Main Image */}
          <div className="relative">
            <Image
              src="/about4.webp"
              width="600"
              height="480"
              alt="Professional Barbershop Service"
              className="relative rounded-2xl shadow-2xl object-cover aspect-[5/4] w-full transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
            
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 transform transition-transform duration-500 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Quality Guaranteed</div>
                  <div className="text-xs text-gray-600">Professional Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;