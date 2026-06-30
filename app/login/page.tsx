"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    }

    router.push("/");
    router.refresh();
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm border border-b-gray-100 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Log In</h1>
        {error && (
          <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}
        ;
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Password"
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
        >
          Log In
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
