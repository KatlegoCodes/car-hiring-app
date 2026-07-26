"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-extrabold text-blue-600 tracking-tight"
        >
          DriveEasy
        </Link>
      </div>

      <div className="flex items-center justify-end gap-6 text-sm font-medium">
        <Link
          href="/recommendations"
          className="text-gray-500 hover:text-blue-600 transition-colors"
        >
          AI Picks
        </Link>

        {session ? (
          <>
            <Link
              href="/dashboard"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              My Bookings
            </Link>
            <button
              className="text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
