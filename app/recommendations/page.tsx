"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Car = {
  id: string;
  brand: string;
  name: string;
  type: string;
  seats: number;
  transmission: string;
  feulType: string;
  pricePerDay: number;
  imageUrl: string;
  location: string;
};

type Recommendations = {
  car: Car;
  reason: string;
};

const RecommandationsPage = () => {
  const [tripType, setTripType] = useState("");
  const [passengers, setPassengers] = useState("");
  const [budget, setBudget] = useState("");
  const [preference, setPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recommendations[]>([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setError("");
    setResults([]);
    setLoading(true);
    setSubmitted(true);

    const res = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripType, passengers, budget, preference }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setResults(data.recommendations);
  };
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Car Recommendations
        </h1>
        <p className="text-gary-500 mb-8">
          Find the perfect car for your next trip!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Trip Type
              </label>
              <select
                value={tripType}
                onChange={(event) => setTripType(event.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select...</option>
                <option value="business">Business</option>
                <option value="family road trip">Family Road Trip</option>
                <option value="airport pickup">Airport Pickup</option>
                <option value="off-road adventure">Off-Road Adventure</option>
                <option value="city driving">City Driving</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="passengers"
                className="block text-sm text-gray-600 mb-1"
              >
                Number of Passengers
              </label>
              <select
                value={passengers}
                onChange={(event) => setPassengers(event.target.value)}
                required
                className="w-full border border-gray-300 rounded-lh p-2"
              >
                <option value="">Select...</option>
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option value={n} key={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Daily Budget (R)
              </label>
              <input
                type="number"
                min={0}
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="Enter your daily budget"
                required
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Any Preferences? (optional)
              </label>
              <input
                type="text"
                value={preference}
                onChange={(event) => setPreference(event.target.value)}
                placeholder="e.g., SUV, automatic, electric"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disbaled:bg-blue-400 text-white font-semibold rounded-lg px-8 py-3 transition-colors"
          >
            {loading ? "Finding Best Cars..." : "Get AI Recommendations"}
          </button>
        </form>

        {/* Results */}
        {submitted && (
          <>
            {loading && (
              <div className="text-center text-gray-500 py-10">
                Asking AI for the best match...
              </div>
            )}

            {error && (
              <p className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</p>
            )}

            {!loading && results.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  AI Recommended Cars
                </h2>
                <div className="flex flex-col gap-4">
                  {results.map(({ car, reason }, i) => (
                    <div
                      key={car.id}
                      className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden flex flex-col sm:flex-row"
                    >
                      <div>
                        <Image
                          src={car.imageUrl}
                          alt={car.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                              #{i + 1} AI Pick
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {car.brand} {car.name}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize mb-2">
                            {car.type} · {car.seats} seats · {""}
                            {car.transmission} · {car.location}
                          </p>
                          <p>"{reason}"</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <p className="text-blue-600 font-bold">
                            R{car.pricePerDay}/day
                          </p>
                        </div>
                        <Link
                          href={`/cars/${car.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                          View & Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!loading && results.length === 0 && !error && (
              <p className="text-gray-500 text-center py-10">
                No cars matched your criteria. Try adjusting your budget or
                preferences.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default RecommandationsPage;
