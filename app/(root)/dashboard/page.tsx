"use client";

import React from "react";
import BookingsTable from "@/components/Shared/BookingTable";
import { useBookings } from "@/hooks/useBookings";
import { Calendar, CheckCircle, XCircle, TrendingUp } from "lucide-react";

const Page = () => {
  const {
    bookings,
    deletingBookingId,
    closingBookingId,
    handleDelete,
    handleClose,
  } = useBookings(true);

  const totalBookings = bookings.length;
  const openBookings = bookings.filter(
    (booking) => booking.status.toLowerCase() === "open"
  ).length;
  const closedBookings = bookings.filter(
    (booking) => booking.status.toLowerCase() === "closed"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage all bookings and appointments</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Bookings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
            <p className="text-xs text-gray-500 mt-2">All time appointments</p>
          </div>

          {/* Open Bookings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Open Bookings</h3>
            <p className="text-3xl font-bold text-gray-900">{openBookings}</p>
            <p className="text-xs text-gray-500 mt-2">
              {totalBookings > 0 
                ? `${Math.round((openBookings / totalBookings) * 100)}% of total`
                : 'No bookings yet'}
            </p>
          </div>

          {/* Closed Bookings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Completed
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Closed Bookings</h3>
            <p className="text-3xl font-bold text-gray-900">{closedBookings}</p>
            <p className="text-xs text-gray-500 mt-2">
              {totalBookings > 0 
                ? `${Math.round((closedBookings / totalBookings) * 100)}% of total`
                : 'No bookings yet'}
            </p>
          </div>

          {/* Completion Rate */}
          <div className="bg-gradient-to-br from-[#028391] to-cyan-600 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-white/90 text-sm font-medium mb-1">Completion Rate</h3>
            <p className="text-3xl font-bold text-white">
              {totalBookings > 0 
                ? `${Math.round((closedBookings / totalBookings) * 100)}%`
                : '0%'}
            </p>
            <p className="text-xs text-white/70 mt-2">Service quality metric</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
            <p className="text-gray-600 mt-1">Manage customer appointments and bookings</p>
          </div>
          
          <div className="overflow-x-auto">
            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600 text-center">
                  Bookings will appear here once customers make appointments
                </p>
              </div>
            ) : (
              <BookingsTable
                bookings={bookings}
                handleDelete={handleDelete}
                handleClose={handleClose}
                deletingBookingId={deletingBookingId}
                closingBookingId={closingBookingId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;