import { useContext, useState, useMemo } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drinks'];

function Home() {
  const { recipes } = useContext(RecipeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        activeCategory === 'All' ||
        recipe.category?.toLowerCase() === activeCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        recipe.title?.toLowerCase().includes(q) ||
        recipe.ingredients?.toLowerCase().includes(q) ||
        recipe.category?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [recipes, activeCategory, searchQuery]);

  const scrollToRecipes = () => {
    const el = document.getElementById('recipes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot">●</span>
              <span>YOUR LITTLE KITCHEN COMPANION</span>
            </div>
            <h1 className="hero-title">
              Good food.<br />
              <span className="hero-title-accent">Good mood.</span>
            </h1>
            <p className="hero-desc">
              Keep your favorite recipes close, discover your next meal, and make every day a little more delicious.
            </p>
            <button type="button" className="hero-btn" onClick={scrollToRecipes}>
              Explore recipes <span>→</span>
            </button>
          </div>

          <div className="hero-visual">
            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">✧</span>
            <span className="sparkle sparkle-3">✦</span>
            <div className="hero-arch-wrapper">
              <img
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80"
                alt="Delicious healthy food bowl"
                className="hero-arch-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Explorer Section */}
      <section className="recipes-section" id="recipes">
        <div className="recipes-container">
          <div className="recipes-header">
            <h2 className="recipes-title">
              Find your next <span className="recipes-title-italic">favorite.</span>
            </h2>
            <span className="recipes-count">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} and counting
            </span>
          </div>

          {/* Search and Category Filters Bar */}
          <div className="filters-bar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'All' && <span className="pill-icon">🍽️</span>}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="empty-recipes">
              <p className="empty-title">No recipes found</p>
              <p className="empty-subtitle">
                Try searching for something else or switch the category filter.
              </p>
            </div>
          ) : (
            <div className="recipes-grid">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
