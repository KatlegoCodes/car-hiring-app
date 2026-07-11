import { prisma } from "@/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const POST = async (req: Request) => {
  const { tripType, passengers, budget, preferences } = await req.json();

  if (!tripType || !passengers || !budget) {
    return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
  }

  const cars = await prisma.car.findMany({
    where: { available: true },
  });

  const carList = cars
    .map(
      (car) =>
        `ID: ${car.id} | ${car.brand} ${car.name} | type: ${car.type} | ` +
        `Seats: ${car.seats} | Transmission: ${car.transmission} |` +
        `Feul: ${car.fuelType} | Price: R${car.pricePerDay}/day |` +
        `Location: ${car.location}`,
    )
    .join("\n");

  const prompt = `
    You are a car rental assistant for DriveEasy, a car hiring app in South Africa.
    
    A customer is looking for a car with these preferences:
    - Trip type: ${tripType}
    - Number of passengers: ${passengers}
    - Daily budget: R${budget}
    - Additional preferences: ${preferences || "None"}
    
    Here is a list of available cars:
    ${carList}
    
    Based on the customer's needs, recommend exactly 2 or 3 cars from the list above.
Respond ONLY with a valid JSON array, no explanation outside the JSON, no markdown backticks.
Format:
[
  {
    "carId": "<exact car ID from the list>",
    "reason": "<one sentence explaining why this car suits the customer>"
}
  ] 
  
  Only recommend cars whose price fits within the customer's budget.
Only include carId values that exist exactly in the list above.
  `.trim();

  const message = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";

  let recommendations: { carId: string; reason: string }[] = [];

  try {
    recommendations = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response" },
      { status: 500 },
    );
  }

  const recommendedCars = await Promise.all(
    recommendations.map(async ({ carId, reason }) => {
      const car = await prisma.car.findUnique({ where: { id: carId } });
      return car ? { car, reason } : null;
    }),
  );

  const filtered = recommendedCars.filter(Boolean);

  return NextResponse.json({ recommendations: filtered });
};
