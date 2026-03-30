import { Link2, Cpu, BookOpen } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Paste a URL",
    desc: "Copy any YouTube cooking video link and paste it in the box above.",
    color: "text-terracotta-500",
    bg: "bg-terracotta-500/8",
  },
  {
    icon: Cpu,
    title: "AI Extracts the Recipe",
    desc: "We fetch the video transcript and run it through Claude AI to pull out every ingredient and step.",
    color: "text-sage-500",
    bg: "bg-sage-500/8",
  },
  {
    icon: BookOpen,
    title: "Cook with Confidence",
    desc: "Get a clean, printable recipe with adjustable servings and chef's tips. No ads, no fluff.",
    color: "text-amber-600",
    bg: "bg-amber-500/8",
  },
];

export default function HowItWorks() {
  return (
    <section className="mt-20 max-w-3xl mx-auto">
      <h2 className="font-display text-2xl font-semibold text-ink-900 text-center mb-10">
        How it works
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="text-center">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${step.bg} mb-4`}
              >
                <Icon size={20} className={step.color} />
              </div>
              <div className="text-xs font-mono text-amber-800/30 mb-1">0{i + 1}</div>
              <h3 className="font-display font-semibold text-ink-900 mb-2">{step.title}</h3>
              <p className="font-body text-sm text-amber-900/55 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
