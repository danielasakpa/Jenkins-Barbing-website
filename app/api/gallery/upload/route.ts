import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, title } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "gallery",
    });

    // Save image URL and title to the database
    const newImage = await prisma.galleryImage.create({
      data: {
        imageUrl: uploadResult.secure_url,
        title: title || null,
      },
    });

    console.log(newImage);

    return NextResponse.json({ galleryImage: newImage }, { status: 201 });
  } catch (error) {
    console.error("Error adding image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
