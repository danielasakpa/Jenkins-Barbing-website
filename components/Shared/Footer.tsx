import React, { useEffect, useState } from "react";
import Section from "./Section";
import Image from "next/image";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCallSharp, IoTimeOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { footerContacts } from "@/constants";
import ScissorsIcon from "./icons/ScissorsIcon";
import Link from "next/link";
import { GalleryImage } from "@/types";

const iconMap: { [key: string]: IconType } = {
  FaLocationDot,
  MdEmail,
  IoCallSharp,
  IoTimeOutline,
};

const SocialIcon = ({
  IconComponent,
  link,
  bgColor,
}: {
  IconComponent: IconType;
  link: string;
  bgColor: string;
}) => (
  <Link href={link} className={`p-2 ${bgColor} rounded-md cursor-pointer`}>
    <IconComponent className="text-white" size={20} />
  </Link>
);

const ContactItem = ({ icon, title }: { icon: string; title: string }) => {
  const IconComponent = iconMap[icon];
  return (
    <div className="flex gap-3 items-center text-white">
      {IconComponent && (
        <IconComponent size={15} className="text-[#028391] font-semibold" />
      )}
      <span>{title}</span>
    </div>
  );
};

const Skeleton = () => (
  <div className="animate-pulse flex justify-center items-center">
    <div className="bg-gray-700 h-[100px] w-[100px] rounded-sm"></div>
  </div>
);

const ImageItem = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex justify-center items-center cursor-pointer">
    <Image
      className="object-cover h-[100px] w-[100px] rounded-sm"
      src={src}
      height={100}
      width={100}
      alt={alt}
    />
  </div>
);

const Footer = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("/api/gallery/images");
        if (response.ok) {
          const data = await response.json();
          setGalleryImages(data);
        } else {
          console.error("Failed to fetch gallery images");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching gallery images:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <Section className="w-full max-w-full bg-[#222324] !py-[50px] px-6 md:px-20 !mb-0 mx-auto grid grid-cols-1 md:grid-cols-3 justify-items-center content-start gap-20 text-center">
      <div className="text-left flex flex-col justify-start h-full">
        <Link
          href="/"
          className="mb-2 flex items-center text-white"
          prefetch={false}
        >
          <ScissorsIcon className="w-7 h-7" />
          <span className="p-medium-20 lg:p-medium-24 text-white">
            Jenkins Haircut
          </span>
        </Link>
        <span className="block mt-2 text-white opacity-80">
          We create styles for the way you look and the way you live!
        </span>
        <div className="flex gap-3 items-center mt-4">
          <SocialIcon
            IconComponent={GrFacebookOption}
            bgColor="bg-blue-600"
            link={"https://wa.me/message/Y7GCET35NVEYI1 "}
          />
          <SocialIcon
            IconComponent={FaWhatsapp}
            bgColor="bg-green-600"
            link={"https://wa.me/message/Y7GCET35NVEYI1"}
          />

          <SocialIcon
            IconComponent={AiFillInstagram}
            bgColor="bg-pink-700"
            link={
              "https://www.instagram.com/ Jenkins_haircut?utm_source=qr&igsh=Yno0OWN3Y3h2dTJo"
            }
          />
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
          {loading
            ? Array(4)
                .fill(null)
                .map((_, index) => <Skeleton key={index} />)
            : galleryImages
                .slice(0, 4)
                .map((image) => (
                  <ImageItem
                    key={image.id}
                    src={image.imageUrl}
                    alt={image.title || ""}
                  />
                ))}
        </div>
      </div>
    </Section>
  );
};

export default Footer;
