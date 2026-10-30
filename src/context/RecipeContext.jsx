/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useMemo } from 'react';

export const RecipeContext = createContext();

export const DEFAULT_RECIPE_IMAGE =
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80';

const initialRecipes = [
  {
    id: 1,
    title: 'Creamy Tomato Pasta',
    category: 'Dinner',
    cookingTime: '25 min',
    difficulty: 'Easy',
    servings: '2 servings',
    description: 'A comforting pasta tossed in a silky tomato and cream sauce with fresh basil.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Farfalle Pasta, Crushed Tomatoes, Heavy Cream, Garlic, Olive Oil, Fresh Basil, Parmesan Cheese, Salt & Pepper',
    instructions: 'Boil pasta until al dente. Heat olive oil and sauté minced garlic. Add crushed tomatoes and simmer for 10 minutes. Stir in heavy cream and parmesan until silky. Toss pasta in sauce and garnish with fresh basil.',
  },
  {
    id: 2,
    title: 'Rainbow Buddha Bowl',
    category: 'Lunch',
    cookingTime: '30 min',
    difficulty: 'Medium',
    servings: '2 servings',
    description: 'A colorful, nourishing bowl with grains, crunchy vegetables, and a zesty dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Quinoa, Roasted Chickpeas, Ripe Avocado, Shredded Purple Cabbage, Grated Carrots, Cherry Tomatoes, Cucumbers, Tahini-Lemon Dressing',
    instructions: 'Cook quinoa and let cool slightly. Roast chickpeas until golden. Arrange quinoa in bowls and top with avocado slices, purple cabbage, carrots, cucumbers, and tomatoes. Drizzle with zesty dressing.',
  },
];

export function RecipeProvider({ children }) {
  const [recipesList, setRecipesList] = useState(() => {
    try {
      const saved = localStorage.getItem('recipebook-recipes-v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error reading recipebook-recipes-v1:', error);
    }
    return initialRecipes;
  });

  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('recipebook-favorites-v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error reading recipebook-favorites-v1:', error);
    }
    return [1];
  });

  // Sync with exact localStorage keys shown in Chrome DevTools inspector
  useEffect(() => {
    try {
      localStorage.setItem('TanstackQueryDevtools.open', 'false');
      localStorage.setItem('recipebook-favorites-v1', JSON.stringify(favoriteIds));
      localStorage.setItem('recipebook-recipes-v1', JSON.stringify(recipesList));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    console.log('--- Chrome LocalStorage Updated ---');
    console.log('recipebook-favorites-v1:\n' + JSON.stringify(favoriteIds));
    console.log('recipebook-recipes-v1:\n' + JSON.stringify(recipesList));
    console.table(recipesList);
  }, [recipesList, favoriteIds]);

  const recipes = useMemo(() => {
    return recipesList.map((r) => ({
      ...r,
      isFavorite: favoriteIds.includes(r.id),
    }));
  }, [recipesList, favoriteIds]);

  const addRecipe = (newRecipeData) => {
    const newRecipe = {
      ...newRecipeData,
      id: Date.now(),
      difficulty: newRecipeData.difficulty?.trim() || 'Easy',
      servings: newRecipeData.servings?.trim() || '2 servings',
      description: newRecipeData.description?.trim() || newRecipeData.instructions?.slice(0, 85) || 'Delicious homemade recipe.',
      image: newRecipeData.image?.trim() || DEFAULT_RECIPE_IMAGE,
    };
    console.log('Added New Recipe:\n', newRecipe);
    setRecipesList((prev) => [newRecipe, ...prev]);
  };

  const deleteRecipe = (id) => {
    console.log('Deleted Recipe ID:', id);
    setRecipesList((prev) => prev.filter((recipe) => recipe.id !== id));
    setFavoriteIds((prev) => prev.filter((fid) => fid !== id));
  };

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id];
      console.log('Toggled Favorite. New recipebook-favorites-v1:', next);
      return next;
    });
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe, toggleFavorite, favoriteIds }}>
      {children}
    </RecipeContext.Provider>
  );
}
