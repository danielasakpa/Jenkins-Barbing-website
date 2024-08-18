import React, { ReactNode } from "react";

interface SectionProps {
  className?: string;
  children: ReactNode;
}

const Section = ({ children, className }: SectionProps) => {
  return (
    <section
      className={`mx-auto max-w-[1366px] py-[20px] mt-2 mb-16 lg:mb-0 lg:mt-20 md:py-24 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
