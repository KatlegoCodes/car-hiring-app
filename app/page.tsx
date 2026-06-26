import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

const Home = async () => {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { pricePerDay: "asc" },
  });

  return (
    <main className="min-h-screen bg-gray-500 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">DriveEasy</h1>
      <p className="text-gray-600 mb-8">Browse available cars for hire</p>

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
                {car.type} &middot {car.seats} seats &middot {car.transmission}
              </p>
              <p className="mt-2 text-blue-600 font-bold">
                R{car.pricePerDay.toString()}/day
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
