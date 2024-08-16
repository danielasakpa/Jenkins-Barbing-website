export interface Service {
  id: number;
  service: string;
  price: string;
  desc: string;
  negotiable?: boolean;
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
