import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.pathname.split("/").pop();

    const { service, date, time, status } = await request.json();

    // Parse and format the date
    const parsedDate = new Date(date);
    const month = parsedDate.getUTCMonth() + 1;
    const day = parsedDate.getUTCDate();
    const year = parsedDate.getUTCFullYear();
    const newDate = `${year}/${month}/${day}`;

    // Find the existing booking
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update the booking details
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        service: service,
        date: newDate,
        time: time,
        status: status,
      },
    });

    return NextResponse.json({ booking: updatedBooking }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.pathname.split("/").pop();

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const updates = await request.json();

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: updates,
    });

    return NextResponse.json({ booking: updatedBooking }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.pathname.split("/").pop();

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Delete the booking from the database
    const booking = await prisma.booking.delete({
      where: { id: bookingId },
    });

    console.log(booking);

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
