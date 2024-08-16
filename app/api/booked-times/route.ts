import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Date parameter is required" },
      { status: 400 }
    );
  }

  const parsedDate = new Date(date);

  const month = parsedDate.getUTCMonth() + 1; // months from 1-12
  const day = parsedDate.getUTCDate();
  const year = parsedDate.getUTCFullYear();

  const newDate = year + "/" + month + "/" + day;

  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json(
      { message: "Invalid date format" },
      { status: 400 }
    );
  }

  console.log(newDate);

  try {
    const bookedTimes = await prisma.booking.findMany({
      where: {
        date: newDate,
      },
      select: {
        time: true,
      },
    });

    console.log(bookedTimes);

    return NextResponse.json(
      { bookedTimes: bookedTimes.map((booking) => booking.time) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
