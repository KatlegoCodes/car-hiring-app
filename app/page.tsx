import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

const Home = async () => {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { pricePerDay: "asc" },
  });

  return (
    <main className="min-h-screen">
      <section className="bg-linear-to-br from-blue-600 to-blue-800 text-white px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Find Your Perfect Ride
        </h1>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          Hire a car across South Africa — from a city commuter to a luxury SUV,
          we have the right car for every trip.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#cars"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Browse Cars
          </a>
          <Link
            href="recommendations"
            className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get AI Recommendations
          </Link>
        </div>
      </section>

      <section className="bg-white px-6 py-14 text-center border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              step: "1",
              title: "Browse or get picks",
              desc: "Filter cars by type and budget, or let our AI recommend the best match for your trip",
            },
            {
              step: "2",
              title: "Book in Seconds",
              desc: "Choose your dates, add extras like GPS or insurance, and confirm your booking instantly",
            },
            {
              step: "3",
              title: "Hit the Road",
              desc: "Manage all your bookings from your dashboard, cancel or view details anytime.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-extrabold text-lg items-center justify-center mb-4 ">
                {step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cars" className="px-6 py-14 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-400">Available Cars</h2>
          <span className="text-sm text-gray-400">
            {cars.length} cars available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link
              href={`/cars/${car.id}`}
              key={car.id}
              className="group bg-white rounded-2xl shadow:sm hover:shadow-md transition-all overflow-hidden border border-gray-100"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolut top-3 left-3 bg-white text-gray-700 text-xs font-semibold px-2 py-1 rounded-full capitalize shadow-sm">
                  {car.type}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {car.brand} {car.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 capitalize">
                  {car.seats} seats · {car.transmission} · {car.fuelType}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-blue-600 font-bold text-lg">
                    R{car.pricePerDay.toString()}
                    <span className="text-sm font-normal text-gray-400">
                      /day
                    </span>
                  </p>
                  <span className="text-xs text-gray-400">{car.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white px-6 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DriveEasy. Built with Next.js, Prisma &
        PostgreSQL
      </footer>
    </main>
  );
};

export default Home;
