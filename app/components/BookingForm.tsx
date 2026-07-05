"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const BookingForm = ({ carId }: { carId: string }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [extras, setExtras] = useState({
    insurance: false,
    gps: false,
    childSeat: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carId, startDate, endDate, extras }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }
    router.push("/dashboard");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 border border-gray-100 rounded-xl p-6 bg-gray-50"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Book this car
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Pickup Date
          </label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Return Date
          </label>
          <input
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Extras</p>
        <div className="flex flex-wrap gap-4">
          {[
            { key: "insurance", label: "Insurance" },
            { key: "gps", label: "GPS" },
            { key: "childSeat", label: "Child Seat" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={extras[key as keyof typeof extras]}
                onChange={(event) =>
                  setExtras((prev) => ({
                    ...prev,
                    [key]: event.target.checked,
                  }))
                }
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        {loading ? "Booking..." : session ? "Confirm Booking" : "Log into Book"}
      </button>
    </form>
  );
};
