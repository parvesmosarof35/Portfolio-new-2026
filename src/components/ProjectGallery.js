"use client";
import React, { useState } from "react";
import Image from "next/image";
import { optimizeImage } from "@/lib/optimizeImage";

const ProjectGallery = ({ images = [], defaultImageUrl, title }) => {
  const projImages =
    images && images.length > 0 ? images : [defaultImageUrl].filter(Boolean);
  const [activeImage, setActiveImage] = useState(
    projImages[0] ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"
  );

  return (
    <div className="space-y-3">
      {/* Big Showcase Image */}
      <div className="w-full h-64 sm:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/20 bg-slate-900/5 dark:bg-slate-900/40 relative">
        <Image
          src={optimizeImage(activeImage, 1000)}
          alt={title || "Project Image"}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover object-top transition-all duration-500"
          priority
        />
      </div>

      {/* Gallery Thumbnails */}
      {projImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 max-w-full">
          {projImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(imgUrl)}
              className={`w-20 h-14 sm:w-28 sm:h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-305 cursor-pointer shadow-sm relative ${
                activeImage === imgUrl
                  ? "border-purple-650 scale-[1.03] shadow-md shadow-purple-500/10"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={optimizeImage(imgUrl, 300)}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
