"use client";

import { ChefHat } from "lucide-react";

const steps = [
  { label: "Fetching video transcript", duration: 1200 },
  { label: "Analyzing cooking instructions", duration: 1800 },
  { label: "Identifying ingredients", duration: 1400 },
  { label: "Structuring the recipe", duration: 1600 },
];

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta-500/10 mb-6">
          <ChefHat className="text-terracotta-500 animate-spin-slow" size={28} />
        </div>
        <h2 className="font-display text-2xl text-ink-900 mb-2">
          Crafting your recipe…
        </h2>
        <p className="font-body text-amber-800/50 text-sm">
          Our AI is watching the video so you don't have to
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-10 max-w-sm mx-auto">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className="flex items-center gap-3"
            style={{
              animation: `fadeUp 0.5s ease-out ${i * 200}ms both`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-terracotta-400 flex-shrink-0"
              style={{
                animation: `pulse 1.5s ${i * 300}ms infinite`,
              }}
            />
            <span className="font-body text-sm text-amber-800/60">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Card skeleton */}
      <div className="bg-white/60 rounded-3xl border border-amber-200/50 p-8 space-y-6">
        {/* Title */}
        <div className="shimmer h-8 w-3/4 rounded-xl" />
        <div className="shimmer h-4 w-full rounded-lg" />
        <div className="shimmer h-4 w-5/6 rounded-lg" />

        {/* Meta badges */}
        <div className="flex gap-3">
          {[80, 100, 70, 90].map((w, i) => (
            <div key={i} className={`shimmer h-8 w-${w === 80 ? '20' : w === 100 ? '24' : w === 70 ? '16' : '20'} rounded-full`} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 pt-2">
          {/* Ingredients skeleton */}
          <div className="space-y-3">
            <div className="shimmer h-5 w-32 rounded-lg" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="shimmer h-4 w-12 rounded" />
                <div className="shimmer h-4 flex-1 rounded" />
              </div>
            ))}
          </div>

          {/* Steps skeleton */}
          <div className="space-y-3">
            <div className="shimmer h-5 w-24 rounded-lg" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="shimmer h-4 w-3/4 rounded" />
                <div className="shimmer h-4 w-full rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
