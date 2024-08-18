import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handleBooking } from "@/lib/bookingHandler";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, service, date, time } = await request.json();
    console.log(email);

    const parsedDate = new Date(date);

    const month = parsedDate.getUTCMonth() + 1; // months from 1-12
    const day = parsedDate.getUTCDate();
    const year = parsedDate.getUTCFullYear();

    const newDate = `${year}/${month}/${day}`;

    const dbUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!dbUser) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Check if the time slot has already been booked.
    const alreadyTaken = await prisma.booking.findFirst({
      where: {
        date: newDate,
        time: time,
      },
    });

    if (alreadyTaken) {
      return NextResponse.json(
        {
          message:
            "This time slot is already booked. Please choose another time.",
        },
        { status: 400 }
      );
    }

    // Check if the user has already booked on the selected date
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: dbUser.id,
        date: newDate,
      },
    });

    if (existingBooking) {
      console.log("You have already booked an appointment for this date.");
      return NextResponse.json(
        { message: "You have already booked an appointment for this date." },
        { status: 400 }
      );
    }

    // Create a new booking
    const booking = await prisma.booking.create({
      data: {
        userId: dbUser.id,
        service: service,
        date: newDate,
        time: time,
        status: "open",
      },
    });

    // Check if the booking was successfully created
    if (booking) {
      // Send email notifications
      await handleBooking({
        barberEmail: "danielasakpa@gmail.com",
        userName: dbUser.name,
        userEmail: dbUser.email,
        service: service,
        date: newDate,
        time: time,
      });
    }

    return NextResponse.json({ booking: booking }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
