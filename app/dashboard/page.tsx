import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CancelButton from "@/components/CancelButton";
import Link from "next/link";
import { CANCELLED } from "dns";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      bookings: {
        include: { car: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-500 mb-8">Welcome back, {user.name}</p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          My Bookings
        </h2>

        {user.bookings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
            <p className="text-gray-500 mb-4">No bookings yet.</p>
            <Link
              href="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Browse available cars
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {user.bookings.map((booking) => {
              const start = new Date(booking.startDate);
              const end = new Date(booking.endDate);
              const days = Math.ceil(
                (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
              );

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl border border-gray-100 shadows-sm p-6  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {booking.car.brand} {booking.car.name}
                      </h3>
                      <span
                        className={`text-xs font-md px-2 py-0.5 rounded-full ${
                          statusColors[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {start.toDateString()} → {end.toDateString()} ({days}{" "}
                      {days === 1 ? "day" : "days"})
                    </p>
                    <p className="text-sm font-medium text-blue-600 mt-1">
                      Total : R{booking.totalPrice.toString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/cars/${booking.carId}`}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                    >
                      View Car
                    </Link>
                    {(booking.status === "CONFIRMED" ||
                      booking.status === "PENDING") && (
                      <CancelButton bookingId={booking.id} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
