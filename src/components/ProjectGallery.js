"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Play, Video } from "lucide-react";
import { optimizeImage } from "@/lib/optimizeImage";

const ProjectGallery = ({ images = [], defaultImageUrl, title, videoUrl }) => {
  const projImages =
    images && images.length > 0 ? images : [defaultImageUrl].filter(Boolean);

  const [activeMedia, setActiveMedia] = useState(
    videoUrl
      ? { type: "video", url: videoUrl }
      : {
          type: "image",
          url:
            projImages[0] ||
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
        }
  );

  return (
    <div className="space-y-3">
      {/* Big Showcase Area */}
      <div className="w-full h-64 sm:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/20 bg-slate-950 relative">
        {activeMedia.type === "video" ? (
          <video
            src={activeMedia.url}
            controls
            playsInline
            className="w-full h-full object-contain bg-black"
            poster={projImages[0] ? optimizeImage(projImages[0], 1000) : undefined}
          />
        ) : (
          <Image
            src={optimizeImage(activeMedia.url, 1000)}
            alt={title || "Project Image"}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover object-top transition-all duration-500"
            priority
          />
        )}
      </div>

      {/* Gallery Thumbnails (Images & Video) */}
      {(videoUrl || projImages.length > 1) && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 max-w-full items-center">
          {/* Optional Video Thumbnail */}
          {videoUrl && (
            <button
              onClick={() => setActiveMedia({ type: "video", url: videoUrl })}
              className={`w-24 h-14 sm:w-28 sm:h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-300 cursor-pointer shadow-sm relative bg-slate-900 flex flex-col items-center justify-center gap-1 ${
                activeMedia.type === "video"
                  ? "border-purple-600 scale-[1.03] shadow-md shadow-purple-500/20 text-purple-400"
                  : "border-slate-800 opacity-75 hover:opacity-100 text-slate-400"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-md">
                <Play size={14} className="fill-current ml-0.5" />
              </div>
              <span className="text-[10px] font-bold tracking-tight">Video Demo</span>
            </button>
          )}

          {/* Image Thumbnails */}
          {projImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMedia({ type: "image", url: imgUrl })}
              className={`w-20 h-14 sm:w-28 sm:h-18 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-300 cursor-pointer shadow-sm relative ${
                activeMedia.type === "image" && activeMedia.url === imgUrl
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
