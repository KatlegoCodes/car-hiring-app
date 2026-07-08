"use client";

import { PATCH } from "@/app/api/bookings/[id]/route";
import { useRouter } from "next/router";
import { useState } from "react";

const CancelButton = async ({ bookingId }: { bookingId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking")) return;

    setLoading(true);

    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
    });

    setLoading(false);

    if (res.ok) {
      router.reload();
    } else {
      const data = await res.json();
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <button
      className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 font-medium"
      onClick={handleCancel}
      disabled={loading}
    >
      {loading ? "Cancelling" : "Cancel Booking"}
    </button>
  );
};

export default CancelButton;
