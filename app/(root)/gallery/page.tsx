"use client";

import { GalleryImage } from "@/types";
import { useEffect, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import ImageUploader from "@/components/Shared/ImageUploader";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const GalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploaded, setUploaded] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

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
  }, [uploaded]);

  const handleDelete = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`/api/gallery/images?id=${imageId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUploaded((prev) => !prev);
        toast({
          description: "Image was successfully deleted!",
          variant: "default",
          className: "bg-green-600 text-white",
        });
      } else {
        toast({
          description: "Failed to delete image",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "An error occurred while deleting the image",
        variant: "destructive",
      });
      console.error("An error occurred while deleting the image:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <Loader2 className="animate-spin h-8 w-8 text-black" />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-28 px-3 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14 lg:px-6">
        {galleryImages.map((image: GalleryImage) => (
          <div key={image.id} className="relative group">
            <Image
              src={image.imageUrl}
              alt={image.title || "Gallery Image"}
              className="w-full rounded-lg overflow-hidden object-cover aspect-[4/3]"
              width="400"
              height="300"
            />
            {session?.user?.isAdmin && (
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 bg-black p-2 rounded-full hover:bg-gray-200"
                aria-label="Delete image"
              >
                <Trash className="h-5 w-5 text-red-500" />
              </button>
            )}
            {image.title && <p className="text-center mt-2">{image.title}</p>}
          </div>
        ))}
      </div>
      {session?.user?.isAdmin && <ImageUploader setUploaded={setUploaded} />}
    </div>
  );
};

export default GalleryPage;
