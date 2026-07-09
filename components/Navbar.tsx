"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-600">
        DriveEasy
      </Link>

      <div className="flex items-center gap-4 text-sm font-medium">
        {session ? (
          <>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Bookings
            </Link>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
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
