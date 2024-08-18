export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "/",
  },
  {
    id: "1",
    title: "Appointment",
    url: "/appointment",
    isAdmin: false,
  },
  {
    id: "2",
    title: "Bookings",
    url: "/bookings",
    isAuth: true,
    isAdmin: false,
  },
  {
    id: "3",
    title: "Gallery",
    url: "/gallery",
  },
  {
    id: "4",
    title: "Dashboard",
    url: "/dashboard",
    isAuth: true,
    isAdmin: true,
  },
  {
    id: "5",
    title: "Contact",
    url: "/contact",
  },
];

export const services = [
  {
    id: "1",
    title: "Barbing",
    desc: "There is a distinction between a beauty salon and a hair salon and although many small businesses.",
  },
  {
    id: "2",
    title: "Dying",
    desc: "There is a distinction between a beauty salon and a hair salon and although many small businesses.",
  },
  {
    id: "3",
    title: "Dread Lock",
    desc: "There is a distinction between a beauty salon and a hair salon and although many small businesses.",
  },
  {
    id: "4",
    title: "Rough curl",
    desc: "There is a distinction between a beauty salon and a hair salon and although many small businesses.",
  },
  {
    id: "5",
    title: "360 Waves",
    desc: "There is a distinction between a beauty salon and a hair salon and although many small businesses.",
  },
  {
    id: "6",
    title: "Home Service",
    desc: "There is a distinction between a beauty salon and a hair salon and although many small businesses.",
  },
];

interface PriceItem {
  id: number;
  service: string;
  price: string;
  desc: string;
  Negotiable?: boolean;
}

export const prices: PriceItem[] = [
  {
    id: 1,
    service: "Haircut",
    price: "1500",
    desc: "A professional haircut tailored to your style preferences, ensuring a clean and polished look.",
  },
  {
    id: 2,
    service: "Haircut & dye",
    price: "2500",
    desc: "A comprehensive service that includes a haircut and hair dyeing to give you a fresh new look.",
  },
  {
    id: 3,
    service: "Shave & Trim",
    price: "1000",
    desc: "A clean shave combined with a precise trim to keep your beard and facial hair well-groomed.",
  },
  {
    id: 4,
    service: "Shave & dye",
    price: "1500",
    desc: "A full grooming service that includes a clean shave and hair dyeing for a complete transformation.",
  },
  {
    id: 5,
    service: "Shave Only",
    price: "800",
    desc: "A close and clean shave to keep your facial hair neat and tidy.",
  },
  {
    id: 6,
    service: "Rough Curl",
    price: "5000",
    desc: "Create a textured and tousled look with our rough curl styling service.",
  },
  {
    id: 7,
    service: "360 Waves",
    price: "10,000",
    desc: "Achieve the perfect 360 waves with our specialized wave styling service for a sleek look.",
  },
  {
    id: 8,
    service: "Dreadlocks",
    price: "Negotiable",
    Negotiable: true,
    desc: "Get professionally styled dreadlocks with our expert dreadlock creation service.",
  },
  {
    id: 12,
    service: "Re-locking of dread",
    price: "3000",
    desc: "Maintain and tighten your dreadlocks with our re-locking service for a refreshed look.",
  },
  {
    id: 12,
    service: "Tinting of Hair (Any Color)",
    price: "Negotiable",
    Negotiable: true,
    desc: "Customize your hair color with our tinting service available in any color of your choice.",
  },
  {
    id: 13,
    service: "Home Services",
    price: "Negotiable",
    Negotiable: true,
    desc: "Enjoy our barbing services in the comfort of your home with our convenient home service option.",
  },
];

export const footerContacts = [
  {
    id: 1,
    icon: "FaLocationDot",
    title: "King Joe Plaza, Edu Agbara Ogun State Nigeria",
  },
  {
    id: 2,
    icon: "MdEmail",
    title: "jenkinshaircut@gmail.com",
  },
  {
    id: 3,
    icon: "IoCallSharp",
    title: "09156561888",
  },
  {
    id: 4,
    icon: "IoTimeOutline",
    title: "Mon - Sat : 9.00 - 18.00",
  },
];
