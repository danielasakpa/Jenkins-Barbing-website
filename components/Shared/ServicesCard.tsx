import React from "react";
import "../../app/(root)/card.css";
import Button from "./Button";
import Link from "next/link";
import { Service } from "@/types";

const ServicesCard = ({ service }: { service: Service }) => {
  return (
    <div
      className="card bg-cover bg-center"
      style={{ backgroundImage: `url(${service.imageUrl})` }}
    >
      <div className="content">
        <span className="title p-semibold-20 text1">{service.service}</span>
        <p className="mt-6 p-regular-14 hidden lg:block">{service.desc}</p>
        <Link href="/appointment">
          <Button className="btn">Book Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
