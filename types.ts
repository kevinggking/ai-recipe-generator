export interface Ingredient {
  amount: string;
  unit: string;
  item: string;
  notes?: string;
}

export interface RecipeStep {
  stepNumber: number;
  title: string;
  description: string;
  duration?: string;
  tips?: string;
}

export interface Recipe {
  title: string;
  description: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  calories?: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  tips: string[];
  tags: string[];
  videoTitle: string;
  videoId: string;
  thumbnailUrl: string;
}

export interface ExtractionResult {
  success: boolean;
  recipe?: Recipe;
  error?: string;
}
