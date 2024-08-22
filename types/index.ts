export interface Service {
  id: string;
  service: string;
  price: string;
  desc: string;
  negotiable?: boolean;
  imageUrl: string;
}

export interface Booking {
  id: string;
  service: Service;
  date: string;
  time: string;
  status: string;
  userId: string;
  user: {
    name: string;
  };
}

export type GalleryImage = {
  id: string;
  imageUrl: string;
  title?: string;
};
