import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

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

  const carSpecs = [
    { label: "Type", value: car.type },
    { label: "Seats", value: `${car.seats} passengers` },
    { label: "Transmission", value: car.transmission },
    { label: "Feul Type", value: car.fuelType },
    { label: "Location", value: car.location },
    {
      label: "Availability",
      value: car.available ? "Available" : "Unavailable",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to all cars
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="relative w-full h-80">
            <Image
              src={car.imageUrl}
              alt={`${car.brand} ${car.name}`}
              fill
              className="object-cover"
            />
            <span className="absolute top-4 left-4 bg-white text=gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
              {car.type}
            </span>
          </div>

          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.brand} {car.name}
                </h1>
                <p className="text-gray-500 mt-1">{car.location}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-blue-600">
                  R{car.pricePerDay.toString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {carSpecs.map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5 ">{label}</p>
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed mb-2">
              {car.description}
            </p>

            <BookingForm carId={car.id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;
