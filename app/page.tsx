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

        <div>
          <a
            href="#cars"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Browse Cars
          </a>
        </div>

        <div>
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border  border-gray-100"
            >
              <div className="relative w-full h-48">
                <Image
                  src={car.imageUrl}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {car.brand} {car.name}
                </h2>
                <p className="text-sm text-gray-500 capatilize">
                  {car.type} &middot {car.seats} seats &middot{" "}
                  {car.transmission}
                </p>
                <p className="mt-2 text-blue-600 font-bold">
                  R{car.pricePerDay.toString()}/day
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
