"use client";

import { GalleryImage } from "@/types";
import { useEffect, useState } from "react";
import { Loader2, Trash, Upload, Image as ImageIcon } from "lucide-react";
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
      <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-[#028391]" />
        <div className="text-gray-600">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#028391] bg-[#028391]/10 border border-[#028391]/20 rounded-full mb-4">
            OUR WORK
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our finest work and get inspired for your next style
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No images yet</h3>
            <p className="text-gray-600 text-center mb-8">
              {session?.user?.isAdmin 
                ? "Start building your gallery by uploading your first image"
                : "Check back soon for amazing transformations"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14">
            {galleryImages.map((image: GalleryImage) => (
              <div 
                key={image.id} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={image.title || "Gallery Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width="400"
                    height="300"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Delete button for admin */}
                  {session?.user?.isAdmin && (
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm p-2.5 rounded-xl hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      aria-label="Delete image"
                    >
                      <Trash className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>
                
                {/* Title */}
                {image.title && (
                  <div className="p-4">
                    <p className="text-gray-900 font-medium truncate">{image.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image Uploader for Admin */}
        {session?.user?.isAdmin && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#028391]/10 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-[#028391]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Upload Images</h2>
                  <p className="text-gray-600">Add new images to your gallery</p>
                </div>
              </div>
              <ImageUploader setUploaded={setUploaded} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;