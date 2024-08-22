import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { message: "Invalid service ID" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const { service, price, desc, negotiable, imageUrl } = body;

    let uploadResult;
    if (imageUrl && imageUrl.startsWith("data:")) {
      // Upload new image to Cloudinary
      uploadResult = await cloudinary.uploader.upload(imageUrl, {
        folder: "services",
      });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        service,
        price: negotiable ? "Negotiable" : price,
        desc,
        negotiable,
        imageUrl: uploadResult ? uploadResult.secure_url : imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Service updated successfully", service: updatedService },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Delete the image from Cloudinary if it exists
    if (service.imageUrl) {
      const publicId = service.imageUrl.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`services/${publicId}`);
      }
    }

    // Delete the service and associated image from the database
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
