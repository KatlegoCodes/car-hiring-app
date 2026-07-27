"use client";

import { useState } from "react";
import Image from "next/image";

type CarModalProps = {
  imageUrl: string;
  name: string;
};

export function CarModal({ imageUrl, name }: CarModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Preview Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        onClick={() => setIsOpen(true)}
        priority
      />

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-fit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-gray-300 transition cursor-pointer"
            >
              ✕
            </button>

            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
