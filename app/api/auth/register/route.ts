import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received registration data:", { 
      name: body.name, 
      email: body.email,
      hasPassword: !!body.password 
    });

    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      console.error("Missing required fields:", { name: !!name, email: !!email, password: !!password });
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("Checking if user exists:", email);
    const dbUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (dbUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    console.log("Hashing password...");
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create the user
    console.log("Creating user in database...");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created successfully:", newUser.id);

    // Don't send the password back
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: userWithoutPassword,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating user:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}