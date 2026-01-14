import React from "react";
import Section from "@/components/Shared/Section";

const About = () => {
  return (
    <Section className="pt-32 pb-20 mt-0 lg:pt-0 lg:pb-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#028391]/5 rounded-full blur-[100px]"></div>
      
      <div className="container relative grid gap-16 px-6 md:px-14 lg:grid-cols-2 lg:gap-20">
        {/* Text Content */}
        <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#028391]/10 border border-[#028391]/20 rounded-full w-max">
            <span className="text-sm font-semibold text-[#028391]">
              OUR STORY
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold">
            About  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#028391] to-cyan-600">
              Jenkins Haircut
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Jenkins Haircut is where style meets skill. With over a decade of
            experience, Jenkins delivers sharp cuts and a welcoming vibe that
            keeps clients coming back.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Our passion for precision and attention to detail ensures that every
            haircut is a masterpiece. Whether you&apos;re looking for a classic cut or
            the latest trend, we&apos;re dedicated to enhancing your unique style.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Step into our chair and experience the difference – where your look is
            our passion, and your satisfaction is our priority.
          </p>

          {/* Key Features */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#028391]/30 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">10+ Years</h3>
                <p className="text-sm text-gray-600">Expert Experience</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#028391]/30 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">5000+</h3>
                <p className="text-sm text-gray-600">Satisfied Clients</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#028391]/30 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">4.9/5.0</h3>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#028391]/30 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Flexible</h3>
                <p className="text-sm text-gray-600">Booking Hours</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center order-1 lg:order-2">
          <div className="relative group">
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#028391] to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(2,131,145,0.05)_25%,rgba(2,131,145,0.05)_50%,transparent_50%,transparent_75%,rgba(2,131,145,0.05)_75%)] bg-[length:20px_20px] rounded-2xl"></div>
            
            {/* Main Image */}
            <div className="relative">
              <img
                src="/about6.jpg"
                alt="Jenkins Haircut Professional Service"
                className="relative rounded-2xl shadow-2xl object-cover w-full transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "550px",
                  aspectRatio: "1/1",
                }}
              />
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#028391] to-cyan-600 text-white rounded-2xl shadow-2xl p-6 transform transition-transform duration-500 hover:scale-105">
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;