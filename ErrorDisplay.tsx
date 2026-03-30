"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
  onReset: () => void;
}

export default function ErrorDisplay({ message, onReset }: ErrorDisplayProps) {
  return (
    <div className="w-full max-w-lg mx-auto text-center animate-fade-in">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 border border-red-100 mb-5">
        <AlertTriangle size={24} className="text-red-400" />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">
        Couldn't extract the recipe
      </h3>
      <p className="font-body text-sm text-amber-900/60 mb-6 max-w-sm mx-auto leading-relaxed">
        {message}
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink-900 text-white font-body text-sm font-medium hover:bg-ink-800 transition-all active:scale-95"
      >
        <RotateCcw size={14} />
        Try Again
      </button>

      <div className="mt-6 text-xs font-body text-amber-800/30">
        <p>Common issues: video has no captions, private video, or no cooking content</p>
      </div>
    </div>
  );
}
