import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

const CarDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
  });

  if (!car) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="relative w-full h-80">
          <Image
            src={car.imageUrl}
            alt={car.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {car.brand} {car.name}
          </h1>
          <p className="text-gray-500 capitalize mt-1">
            {car.type} &middot {car.location}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400">Seats</p>
              <p className="font-semibold text-gray-900">{car.seats}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400">Transmission</p>
              <p className="font-semibold text-gray-900 capitalize">
                {car.transmission}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-400">Feul Type</p>
              <p className="font-semibold text-gray-900 capitalize">
                {car.fuelType}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 ">
              <p className="text-gray-400">Price/day</p>
              <p className="font-semibold text-blue-600">
                R{car.pricePerDay.toString()}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mt-6 leading-relaxed ">
            {car.description}
          </p>
          <button className="mt-8 w-full sm:w-auto bg-blue-900 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;
