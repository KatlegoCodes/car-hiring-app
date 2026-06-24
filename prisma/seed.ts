import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const cars = [
  {
    name: "Corolla",
    brand: "Toyota",
    type: "sedan",
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    pricePerDay: 45.0,
    imageUrl:
      "https://images.unsplash.com/photo-1623869675184-66c12d747bc1?w=800",
    location: "Pretoria",
    description:
      "Reliable, fuel-efficient sedan perfect for city driving and commutes.",
  },
  {
    name: "RAV4",
    brand: "Toyota",
    type: "suv",
    seats: 5,
    transmission: "automatic",
    fuelType: "hybrid",
    pricePerDay: 75.0,
    imageUrl:
      "https://images.unsplash.com/photo-1568844293986-8d32689f3e9c?w=800",
    location: "Pretoria",
    description:
      "Spacious hybrid SUV, great for family trips and light off-road use.",
  },
  {
    name: "Model 3",
    brand: "Tesla",
    type: "electric",
    seats: 5,
    transmission: "automatic",
    fuelType: "electric",
    pricePerDay: 120.0,
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
    location: "Johannesburg",
    description:
      "All-electric sedan with autopilot features and zero emissions.",
  },
  {
    name: "3 Series",
    brand: "BMW",
    type: "luxury",
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    pricePerDay: 110.0,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    location: "Johannesburg",
    description: "Premium sedan with a smooth ride, ideal for business travel.",
  },
  {
    name: "Civic",
    brand: "Honda",
    type: "sedan",
    seats: 5,
    transmission: "manual",
    fuelType: "petrol",
    pricePerDay: 40.0,
    imageUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
    location: "Cape Town",
    description:
      "Compact and economical, a solid choice for budget-conscious renters.",
  },
  {
    name: "Hilux",
    brand: "Toyota",
    type: "suv",
    seats: 5,
    transmission: "manual",
    fuelType: "diesel",
    pricePerDay: 85.0,
    imageUrl:
      "https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=800",
    location: "Pretoria",
    description:
      "Rugged double-cab bakkie, built for road trips and rough terrain.",
  },
  {
    name: "A-Class",
    brand: "Mercedes-Benz",
    type: "luxury",
    seats: 5,
    transmission: "automatic",
    fuelType: "petrol",
    pricePerDay: 100.0,
    imageUrl:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800",
    location: "Cape Town",
    description:
      "Compact luxury hatchback with premium interior and tech features.",
  },
  {
    name: "Polo Vivo",
    brand: "Volkswagen",
    type: "sedan",
    seats: 5,
    transmission: "manual",
    fuelType: "petrol",
    pricePerDay: 35.0,
    imageUrl:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
    location: "Durban",
    description:
      "Affordable, easy-to-drive hatchback, great for first-time renters.",
  },
  {
    name: "X5",
    brand: "BMW",
    type: "suv",
    seats: 7,
    transmission: "automatic",
    fuelType: "petrol",
    pricePerDay: 150.0,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    location: "Johannesburg",
    description:
      "Full-size luxury SUV with seating for 7, ideal for larger groups.",
  },
  {
    name: "Leaf",
    brand: "Nissan",
    type: "electric",
    seats: 5,
    transmission: "automatic",
    fuelType: "electric",
    pricePerDay: 90.0,
    imageUrl:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    location: "Cape Town",
    description: "Practical electric hatchback, affordable and easy to charge.",
  },
];

const main = async () => {
  console.log("Seeding database...");

  for (const car of cars) {
    await prisma.car.create({ data: car });
  }

  console.log(`Seeded ${cars.length} cars.`);
};

main()
  .catch((event) => {
    console.error(event);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
