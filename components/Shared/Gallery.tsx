import React from "react";
import Image from "next/image";

const Gallery = () => {
  return (
    <div className="hero__item hidden lg:block">
      <div className="boxes max-w-sm md:w-[300px]">
        <div className="boxes__box"></div>
        <div className="boxes__box"></div>
        <div className="boxes__box"></div>
        <div className="boxes__box"></div>
        <div className="boxes__box"></div>
        <div className="boxes__box"></div>
        <div className="z-70 boxes__box">
          <Image
            src="/about.jpg"
            width={300}
            height={300}
            alt=""
            className="object-cover rounded-lg shadow-lg z-10"
            style={{ aspectRatio: "300/300", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
