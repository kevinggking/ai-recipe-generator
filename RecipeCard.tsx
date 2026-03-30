"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Users,
  ChefHat,
  Flame,
  ExternalLink,
  Printer,
  Copy,
  Check,
  Bookmark,
  Tag,
} from "lucide-react";
import { Recipe } from "@/lib/types";
import { getVideoUrl } from "@/lib/youtube";
import clsx from "clsx";

interface RecipeCardProps {
  recipe: Recipe;
  onReset: () => void;
}

const difficultyColor = {
  Easy: "bg-sage-400/15 text-sage-600 border-sage-400/30",
  Medium: "bg-amber-400/15 text-amber-700 border-amber-400/30",
  Hard: "bg-terracotta-400/15 text-terracotta-600 border-terracotta-400/30",
};

export default function RecipeCard({ recipe, onReset }: RecipeCardProps) {
  const [copied, setCopied] = useState(false);
  const [servings, setServings] = useState(recipe.servings);
  const scale = servings / recipe.servings;

  const handleCopy = async () => {
    const text = formatRecipeAsText(recipe);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scaleAmount = (amount: string): string => {
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const scaled = num * scale;
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-up">
      {/* Action bar */}
      <div className="flex items-center justify-between mb-6 no-print">
        <button
          onClick={onReset}
          className="text-sm font-body text-amber-800/50 hover:text-terracotta-500 transition-colors flex items-center gap-1"
        >
          ← Try another video
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-sm font-body font-medium text-ink-800 transition-all"
          >
            {copied ? <Check size={14} className="text-sage-500" /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 text-sm font-body font-medium text-ink-800 transition-all"
          >
            <Printer size={14} />
            Print
          </button>
          <a
            href={getVideoUrl(recipe.videoId)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-body font-medium transition-all"
          >
            <ExternalLink size={14} />
            Watch Video
          </a>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-amber-100 shadow-xl overflow-hidden">
        {/* Hero section */}
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={recipe.thumbnailUrl}
              alt={recipe.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-body font-medium text-amber-200/80 uppercase tracking-widest">
                {recipe.cuisine}
              </span>
              <span className="text-amber-200/40">·</span>
              <span
                className={clsx(
                  "text-xs font-body font-semibold px-2.5 py-0.5 rounded-full border",
                  "bg-white/10 border-white/20 text-white"
                )}
              >
                {recipe.difficulty}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-white font-bold leading-tight">
              {recipe.title}
            </h1>
          </div>
        </div>

        <div className="p-8">
          {/* Description */}
          <p className="font-body text-amber-900/70 text-base leading-relaxed mb-8">
            {recipe.description}
          </p>

          {/* Meta strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Clock, label: "Prep", value: recipe.prepTime },
              { icon: Flame, label: "Cook", value: recipe.cookTime },
              { icon: Clock, label: "Total", value: recipe.totalTime },
              { icon: Users, label: "Serves", value: `${servings}` },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="text-center py-4 px-3 rounded-2xl bg-cream-100 border border-amber-100"
              >
                <Icon size={18} className="mx-auto mb-1 text-terracotta-500" />
                <p className="text-xs font-body text-amber-800/50 uppercase tracking-wider mb-1">
                  {label}
                </p>
                <p className="font-display font-semibold text-ink-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Servings adjuster */}
          <div className="flex items-center gap-3 mb-8 p-4 rounded-2xl bg-sage-400/8 border border-sage-400/20 no-print">
            <ChefHat size={16} className="text-sage-500" />
            <span className="font-body text-sm text-ink-800">Adjust servings:</span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-7 h-7 rounded-full border border-amber-200 bg-white hover:bg-amber-50 flex items-center justify-center text-ink-800 font-bold transition-all"
              >
                −
              </button>
              <span className="font-display font-semibold text-ink-900 w-8 text-center">
                {servings}
              </span>
              <button
                onClick={() => setServings(servings + 1)}
                className="w-7 h-7 rounded-full border border-amber-200 bg-white hover:bg-amber-50 flex items-center justify-center text-ink-800 font-bold transition-all"
              >
                +
              </button>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid md:grid-cols-5 gap-10">
            {/* Ingredients */}
            <div className="md:col-span-2">
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-6 bg-terracotta-500 rounded-full inline-block" />
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 py-2 border-b border-amber-100/60 last:border-0"
                  >
                    <span className="font-mono text-xs text-terracotta-500 font-medium w-14 text-right flex-shrink-0 pt-0.5">
                      {scaleAmount(ing.amount)} {ing.unit}
                    </span>
                    <span className="font-body text-sm text-ink-800">
                      {ing.item}
                      {ing.notes && (
                        <span className="text-amber-800/40 italic"> ({ing.notes})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="md:col-span-3">
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-6 bg-sage-500 rounded-full inline-block" />
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.steps.map((step) => (
                  <li key={step.stepNumber} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-900 text-cream-50 text-sm font-display font-bold flex items-center justify-center mt-0.5">
                      {step.stepNumber}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-body font-semibold text-ink-900 text-sm">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <span className="text-xs font-body text-amber-800/40 flex items-center gap-1">
                            <Clock size={10} />
                            {step.duration}
                          </span>
                        )}
                      </div>
                      <p className="font-body text-sm text-amber-900/70 leading-relaxed">
                        {step.description}
                      </p>
                      {step.tips && (
                        <div className="mt-2 text-xs font-body text-sage-600 bg-sage-400/8 border border-sage-400/20 rounded-xl px-3 py-2">
                          💡 {step.tips}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tips */}
          {recipe.tips.length > 0 && (
            <div className="mt-10 p-6 rounded-2xl bg-amber-50 border border-amber-200/50">
              <h3 className="font-display text-lg font-semibold text-ink-900 mb-4 flex items-center gap-2">
                <Bookmark size={16} className="text-terracotta-500" />
                Chef's Tips
              </h3>
              <ul className="space-y-2">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-amber-900/70">
                    <span className="text-terracotta-400 mt-0.5">✦</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <Tag size={12} className="text-amber-800/30" />
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body px-3 py-1 rounded-full bg-amber-100 text-amber-800/60 border border-amber-200/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatRecipeAsText(recipe: Recipe): string {
  const lines = [
    recipe.title,
    "=".repeat(recipe.title.length),
    "",
    recipe.description,
    "",
    `Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime} | Total: ${recipe.totalTime} | Serves: ${recipe.servings}`,
    "",
    "INGREDIENTS",
    "-----------",
    ...recipe.ingredients.map(
      (i) => `• ${i.amount} ${i.unit} ${i.item}${i.notes ? ` (${i.notes})` : ""}`
    ),
    "",
    "INSTRUCTIONS",
    "------------",
    ...recipe.steps.map(
      (s) => `${s.stepNumber}. ${s.title}\n   ${s.description}${s.tips ? `\n   Tip: ${s.tips}` : ""}`
    ),
    "",
    ...(recipe.tips.length > 0
      ? ["TIPS", "----", ...recipe.tips.map((t) => `• ${t}`)]
      : []),
  ];
  return lines.join("\n");
}
