import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

export async function GET() {
  try {
    const services = await prisma.service.findMany();

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { service, price, desc, negotiable, imageUrl } = await req.json();

    // Check if the service already exists
    let existingService = await prisma.service.findFirst({
      where: { service: service },
    });

    if (existingService) {
      return NextResponse.json(
        { message: "This service already exists." },
        { status: 400 }
      );
    }

    let uploadResult;

    // Upload image to Cloudinary
    uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "services",
    });

    const newService = await prisma.service.create({
      data: {
        service,
        price,
        desc,
        negotiable: negotiable || false,
        imageUrl: uploadResult.secure_url,
      },
    });

    return NextResponse.json({ service: newService }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
