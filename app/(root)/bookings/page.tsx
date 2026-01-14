"use client";

import React from "react";
import { useSession } from "next-auth/react";
import BookingsTable from "@/components/Shared/BookingTable";
import { Loader2, Calendar, TrendingUp, Clock } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";

const Page = () => {
  const { data: session, status } = useSession();
  const { bookings, deletingBookingId, error, loading, handleDelete } =
    useBookings(false);

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-[#028391]" />
        <div className="text-gray-600">Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const totalBookings = bookings.length;
  const mostFrequentService = bookings.reduce((acc, curr) => {
    acc[curr.service.service] = (acc[curr.service.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostBookedService =
    totalBookings > 0
      ? Object.keys(mostFrequentService).reduce((a, b) =>
          mostFrequentService[a] > mostFrequentService[b] ? a : b
        )
      : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-16 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#028391] to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-[#028391]/30">
              <span className="text-2xl font-bold text-white">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Welcome back, {session?.user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Bookings Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                All Time
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
          </div>

          {/* Most Booked Service Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Popular
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Top Service</h3>
            {totalBookings > 0 ? (
              <>
                <p className="text-xl font-bold text-gray-900 mb-1">{mostBookedService}</p>
                <p className="text-sm text-gray-500">
                  {mostFrequentService[mostBookedService]} bookings
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-gray-400">No data yet</p>
            )}
          </div>

          {/* Quick Action Card */}
          <div className="bg-gradient-to-br from-[#028391] to-cyan-600 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-white/90 text-sm font-medium mb-3">Ready for a fresh cut?</h3>
            <a
              href="/appointment"
              className="inline-flex items-center justify-center w-full bg-white text-[#028391] font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Bookings Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
            <p className="text-gray-600 mt-1">Manage and track all your appointments</p>
          </div>
          
          <div className="overflow-x-auto">
            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 text-center mb-6">
                  Start by booking your first appointment with us!
                </p>
                <a
                  href="/appointment"
                  className="bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-200"
                >
                  Book Appointment
                </a>
              </div>
            ) : (
              <BookingsTable
                bookings={bookings}
                handleDelete={handleDelete}
                deletingBookingId={deletingBookingId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;