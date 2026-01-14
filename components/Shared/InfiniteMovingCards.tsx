"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[24rem] z-[-1] rounded-md flex flex-col antialiased bg-transparent bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Jenkins takes his time and really listens. My haircut came out clean, sharp, and exactly how I wanted it.",
    name: "Michael Turner",
    title: "Product Designer",
    img: "/test1.jpg",
  },
  {
    quote:
      "From the moment you walk in, you feel comfortable. The service is professional and the results speak for themselves.",
    name: "David Coleman",
    title: "Fitness Coach",
    img: "/test2.jpg",
  },
  {
    quote:
      "I’ve tried several barbers in the area, but Jenkins stands out. Consistent quality every single visit.",
    name: "Samuel Brooks",
    title: "Entrepreneur",
    img: "/test3.jpg",
  },
  {
    quote:
      "I booked online and everything was smooth. Jenkins was friendly, precise, and delivered a perfect cut.",
    name: "Anthony Reed",
    title: "Software Engineer",
    img: "/test4.jpg",
  },
  {
    quote:
      "Attention to detail is unmatched here. You can tell Jenkins truly cares about his craft.",
    name: "Daniel Foster",
    title: "Photographer",
    img: "/test5.jpg",
  },
  {
    quote:
      "Great environment, great conversations, and an even better haircut. Highly recommended.",
    name: "Brian Mitchell",
    title: "Marketing Specialist",
    img: "/test1.jpg",
  },
  {
    quote:
      "Jenkins made my first visit memorable. Clean fades, sharp lines, and no rush at all.",
    name: "Kelvin Johnson",
    title: "University Student",
    img: "/test2.jpg",
  },
  {
    quote:
      "This is the kind of barbershop you stick with long-term. Professional service every time.",
    name: "Chris Williams",
    title: "Real Estate Agent",
    img: "/test3.jpg",
  },
  {
    quote:
      "I brought my brother along and we both left impressed. Jenkins knows exactly what he’s doing.",
    name: "Paul Anderson",
    title: "Logistics Manager",
    img: "/test4.jpg",
  },
  {
    quote:
      "Clean shop, calm atmosphere, and excellent results. Easily my go-to barbershop now.",
    name: "Joseph Carter",
    title: "Content Creator",
    img: "/test5.jpg",
  },
];


export default InfiniteMovingCardsDemo;
