import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { carId, startDate, endDate, extras } = await req.json();

  if (!carId || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const car = await prisma.car.findUnique({ where: { id: carId } });

  if (!car || !car.available) {
    return NextResponse.json({ error: "Car Not Available" }, { status: 400 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (days < 1) {
    return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
  }

  const totalPrice = Number(car.pricePerDay) * days;

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      carId: car.id,
      startDate: start,
      endDate: end,
      totalPrice,
      status: "CONFIRMED",
      extras: extras || {},
    },
  });

  return NextResponse.json(booking);
};
