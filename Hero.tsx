"use client";

import { Utensils } from "lucide-react";

export default function Hero() {
  return (
    <div className="text-center mb-14">
      {/* Wordmark */}
      <div className="inline-flex items-center gap-2.5 mb-8">
        <div className="w-8 h-8 rounded-lg bg-terracotta-500 flex items-center justify-center">
          <Utensils size={16} className="text-white" />
        </div>
        <span className="font-display text-xl font-semibold text-ink-900 tracking-tight">
          RecipeReel
        </span>
      </div>

      {/* Headline */}
      <h1
        className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-ink-900 leading-tight mb-6"
        style={{ opacity: 0, animation: "fadeUp 0.7s ease-out 100ms forwards" }}
      >
        Any cooking video.
        <br />
        <span className="text-terracotta-500 italic">Instant recipe.</span>
      </h1>

      <p
        className="font-body text-lg text-amber-900/50 max-w-lg mx-auto leading-relaxed"
        style={{ opacity: 0, animation: "fadeUp 0.7s ease-out 250ms forwards" }}
      >
        Paste a YouTube URL. Our AI extracts the full recipe — ingredients,
        steps, and chef tips — so you can cook along without scrubbing through
        the video.
      </p>

      {/* Decorative elements */}
      <div
        className="flex items-center justify-center gap-6 mt-8 text-xs font-body text-amber-800/30 uppercase tracking-widest"
        style={{ opacity: 0, animation: "fadeUp 0.7s ease-out 400ms forwards" }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-sage-400 inline-block" />
          Adjustable servings
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-terracotta-400 inline-block" />
          Print-ready
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
          Free to use
        </span>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
