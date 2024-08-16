import React from "react";
import Section from "./Section";
import Image from "next/image";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCallSharp, IoTimeOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { footerContacts } from "@/constants";

const iconMap: { [key: string]: IconType } = {
  FaLocationDot,
  MdEmail,
  IoCallSharp,
  IoTimeOutline,
};

const SocialIcon = ({
  IconComponent,
  bgColor,
}: {
  IconComponent: IconType;
  bgColor: string;
}) => (
  <span className={`p-2 ${bgColor} rounded-md cursor-pointer`}>
    <IconComponent className="text-white" size={20} />
  </span>
);

const ContactItem = ({ icon, title }: { icon: string; title: string }) => {
  const IconComponent = iconMap[icon];
  return (
    <div className="flex gap-3 items-center text-white">
      {IconComponent && <IconComponent size={15} className="text-[#DC5F00]" />}
      <span>{title}</span>
    </div>
  );
};

const ImageItem = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex justify-center items-center rounded-md cursor-pointer">
    <Image
      className="object-cover h-[100px] w-[100px]"
      src={src}
      height={100}
      width={100}
      alt={alt}
    />
  </div>
);

const Footer = () => (
  <div className="w-full max-w-full bg-black">
    <Section className="py-20 px-6 md:px-20 mx-auto grid grid-cols-1 md:grid-cols-3 justify-items-center content-start gap-20 text-center">
      <div className="text-left flex flex-col justify-start h-full">
        <a className="flex gap-2 items-center w-[12rem]" href="#hero">
          <Image
            src={"/header-logo.png"}
            width={50}
            height={40}
            alt="header-logo"
          />
          <span className="h4-medium text-white">JENKINS</span>
        </a>
        <span className="block mt-2 text-white opacity-80">
          We create styles for the way you look and the way you live!
        </span>
        <div className="flex gap-3 items-center mt-4">
          <SocialIcon IconComponent={GrFacebookOption} bgColor="bg-blue-600" />
          <SocialIcon IconComponent={AiFillInstagram} bgColor="bg-pink-500" />
          <SocialIcon IconComponent={FaTwitter} bgColor="bg-blue-400" />
        </div>
      </div>
      <div className="text-left flex flex-col justify-start h-full">
        <span className="block p-medium-20 text-white mb-3">Contact Us</span>
        <div className="flex flex-col gap-3">
          {footerContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              icon={contact.icon}
              title={contact.title}
            />
          ))}
        </div>
      </div>
      <div className="hidden text-left md:flex flex-col items-start h-full">
        <span className="block p-medium-20 text-white mb-3">Photo Gallery</span>
        <div className="grid grid-cols-2 gap-4">
          <ImageItem src="/about.jpg" alt="About Image" />
          <ImageItem src="/about1.jpg" alt="About Image 1" />
          <ImageItem src="/about2.jpg" alt="About Image 2" />
          <ImageItem src="/about3.jpg" alt="About Image 3" />
        </div>
      </div>
    </Section>
  </div>
);

export default Footer;
