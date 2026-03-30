import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecipeReel — Extract Recipes from Any Cooking Video",
  description:
    "Paste a YouTube cooking video URL and instantly get a clean, structured recipe with ingredients, steps, and tips. Powered by AI.",
  keywords: ["recipe extractor", "youtube recipe", "cooking video", "AI recipe"],
  openGraph: {
    title: "RecipeReel — Extract Recipes from Any Cooking Video",
    description: "Turn any YouTube cooking video into a clean, printable recipe instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">{children}</body>
    </html>
  );
}
