"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import UrlInput from "@/components/UrlInput";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RecipeCard from "@/components/RecipeCard";
import ErrorDisplay from "@/components/ErrorDisplay";
import HowItWorks from "@/components/HowItWorks";
import { Recipe } from "@/lib/types";

type State = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [state, setState] = useState<State>("idle");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (url: string) => {
    setState("loading");
    setRecipe(null);
    setError("");

    try {
      const res = await fetch("/api/extract-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setRecipe(data.recipe);
      setState("success");

      // Scroll to recipe
      setTimeout(() => {
        document.getElementById("recipe-output")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setState("error");
    }
  };

  const handleReset = () => {
    setState("idle");
    setRecipe(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative z-10 min-h-screen">
      {/* Decorative background blobs */}
      <div
        aria-hidden
        className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C4614A 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #628B70 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        {/* Hero — hide when showing results */}
        {state !== "success" && <Hero />}

        {/* URL Input */}
        <div
          className={state === "success" ? "mb-8 no-print" : "mb-16"}
          style={{
            opacity: 0,
            animation: "fadeUp 0.7s ease-out 350ms forwards",
          }}
        >
          <UrlInput onSubmit={handleSubmit} isLoading={state === "loading"} />
        </div>

        {/* Output area */}
        <div id="recipe-output">
          {state === "loading" && <LoadingSkeleton />}
          {state === "error" && (
            <ErrorDisplay message={error} onReset={handleReset} />
          )}
          {state === "success" && recipe && (
            <RecipeCard recipe={recipe} onReset={handleReset} />
          )}
        </div>

        {/* How it works — only on idle */}
        {state === "idle" && <HowItWorks />}

        {/* Footer */}
        {state !== "success" && (
          <footer className="mt-20 text-center text-xs font-body text-amber-800/25 no-print">
            <p>
              Powered by{" "}
              <a
                href="https://anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta-500 transition-colors"
              >
                Claude AI
              </a>{" "}
              · No account required · Free to use
            </p>
          </footer>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
