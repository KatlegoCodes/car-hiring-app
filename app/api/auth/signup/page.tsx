"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }
    router.push("/login");
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Sign Up</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
          Create Account
        </button>
      </form>
    </main>
  );
};

export default SignUp;
