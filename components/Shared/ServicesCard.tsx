import React from "react";
import "../../app/(root)/card.css";
import Button from "./Button";
import Link from "next/link";

interface ServicesCardProps {
  id: string;
  title: string;
  desc: string;
}

const ServicesCard = ({ service }: { service: ServicesCardProps }) => {
  return (
    <div className="card">
      <div className="content">
        <span className="title p-semibold-20 text1">{service.title}</span>
        <p className="mt-6 p-regular-14 ">{service.desc}</p>
        <Link href="/appointment">
          <Button className="btn">Book Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
