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
      "Jenkins is a true professional. I always leave the shop looking sharp and feeling confident. Highly recommend!",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    img: "/test1.jpg",
  },
  {
    quote:
      "The atmosphere is welcoming, and the service is top-notch. Jenkins knows exactly how to deliver the perfect cut every time.",
    name: "William Shakespeare",
    title: "Hamlet",
    img: "/test2.jpg",
  },
  {
    quote:
      "Best barbershop in town! Jenkins is skilled, friendly, and always makes sure you're satisfied with your look.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    img: "/test3.jpg",
  },
  {
    quote:
      "I brought my son here for his first haircut, and Jenkins made it a wonderful experience. The cut was perfect, and the service was fantastic.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    img: "/test4.jpg",
  },
  {
    quote:
      "Every visit to Jenkins' Barbershop is a great experience. The attention to detail is unmatched, and I always leave feeling like a new man.",
    name: "Herman Melville",
    title: "Moby-Dick",
    img: "/test5.jpg",
  },
  {
    quote:
      "Jenkins is a true professional. I always leave the shop looking sharp and feeling confident. Highly recommend!",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    img: "/test1.jpg",
  },
  {
    quote:
      "The atmosphere is welcoming, and the service is top-notch. Jenkins knows exactly how to deliver the perfect cut every time.",
    name: "William Shakespeare",
    title: "Hamlet",
    img: "/test2.jpg",
  },
  {
    quote:
      "Best barbershop in town! Jenkins is skilled, friendly, and always makes sure you're satisfied with your look.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    img: "/test3.jpg",
  },
  {
    quote:
      "I brought my son here for his first haircut, and Jenkins made it a wonderful experience. The cut was perfect, and the service was fantastic.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    img: "/test4.jpg",
  },
  {
    quote:
      "Every visit to Jenkins' Barbershop is a great experience. The attention to detail is unmatched, and I always leave feeling like a new man.",
    name: "Herman Melville",
    title: "Moby-Dick",
    img: "/test5.jpg",
  },
  {
    quote:
      "Jenkins is a true professional. I always leave the shop looking sharp and feeling confident. Highly recommend!",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
    img: "/test1.jpg",
  },
  {
    quote:
      "The atmosphere is welcoming, and the service is top-notch. Jenkins knows exactly how to deliver the perfect cut every time.",
    name: "William Shakespeare",
    title: "Hamlet",
    img: "/test2.jpg",
  },
  {
    quote:
      "Best barbershop in town! Jenkins is skilled, friendly, and always makes sure you're satisfied with your look.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
    img: "/test3.jpg",
  },
  {
    quote:
      "I brought my son here for his first haircut, and Jenkins made it a wonderful experience. The cut was perfect, and the service was fantastic.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
    img: "/test4.jpg",
  },
  {
    quote:
      "Every visit to Jenkins' Barbershop is a great experience. The attention to detail is unmatched, and I always leave feeling like a new man.",
    name: "Herman Melville",
    title: "Moby-Dick",
    img: "/test5.jpg",
  },
];

export default InfiniteMovingCardsDemo;
