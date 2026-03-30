"use client";

import { useState } from "react";
import { Youtube, ArrowRight, Loader2 } from "lucide-react";
import { isValidYouTubeUrl } from "@/lib/youtube";
import clsx from "clsx";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please paste a YouTube URL");
      return;
    }

    if (!isValidYouTubeUrl(url.trim())) {
      setError("That doesn't look like a valid YouTube URL");
      return;
    }

    onSubmit(url.trim());
  };

  const exampleUrls = [
    "Gordon Ramsay's Beef Wellington",
    "Binging with Babish Pasta",
    "Joshua Weissman Fried Chicken",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={clsx(
            "flex items-center gap-0 rounded-2xl border-2 transition-all duration-300 overflow-hidden",
            "bg-white shadow-lg",
            focused
              ? "border-terracotta-500 shadow-terracotta-500/10 shadow-xl"
              : "border-amber-200/60",
            error && "border-red-400"
          )}
        >
          <div className="flex items-center pl-4 pr-2 text-red-500">
            <Youtube size={22} className="flex-shrink-0" />
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste a YouTube cooking video URL..."
            className="flex-1 py-4 pr-2 text-ink-900 bg-transparent outline-none font-body text-base placeholder:text-amber-800/30"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className={clsx(
              "flex items-center gap-2 px-6 py-4 font-body font-semibold text-sm transition-all duration-200",
              "bg-terracotta-500 text-white",
              "hover:bg-terracotta-600 active:scale-95",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-terracotta-500",
              "rounded-r-xl"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Extracting…</span>
              </>
            ) : (
              <>
                <span>Extract</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-red-500 text-sm font-body animate-fade-in pl-1">
            {error}
          </p>
        )}
      </form>

      <p className="mt-3 text-center text-xs text-amber-800/40 font-body">
        Try: {exampleUrls.map((e, i) => (
          <span key={i}>
            <em>{e}</em>
            {i < exampleUrls.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
