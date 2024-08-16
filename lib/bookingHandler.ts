import { Service } from "@/types";
import { sendEmail } from "./emailService";

interface BookingDetails {
  barberEmail: string;
  userName: string;
  userEmail: string;
  service: Service;
  date: string;
  time: string;
}

export const handleBooking = async (
  bookingDetails: BookingDetails
): Promise<void> => {
  const { barberEmail, userName, userEmail, service, date, time } =
    bookingDetails;

  // Extract details from service object
  const serviceName = service.service;
  const servicePrice = service.price;
  const isNegotiable = service.negotiable;

  // Email content
  const userEmailSubject = "Booking Confirmation";
  const userEmailText = `Hello 👋 ${userName},

Your booking for ${serviceName} on ${date} at ${time} has been confirmed.
Price: ${servicePrice} ${isNegotiable ? "(Negotiable)" : ""}

Thank you for booking with us!`;

  const barberEmailSubject = "New Booking Received";
  const barberEmailText = `Hey 👋 Jenkins,

A new booking has been made.

Service: ${serviceName}
Price: ${servicePrice} ${isNegotiable ? "(Negotiable)" : ""}
Date: ${date}
Time: ${time}
User Email: ${userEmail}`;

  // Send emails
  await sendEmail({
    to: userEmail,
    subject: userEmailSubject,
    text: userEmailText,
  });
  await sendEmail({
    to: barberEmail,
    subject: barberEmailSubject,
    text: barberEmailText,
  });
};
