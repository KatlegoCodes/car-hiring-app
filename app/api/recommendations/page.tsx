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
  return <main></main>;
};

export default RecommandationsPage;
