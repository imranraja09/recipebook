import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

function Favorites() {
  const { recipes } = useContext(RecipeContext);
  const favoriteRecipes = recipes.filter((r) => r.isFavorite);

  return (
    <div className="favorites-page">
      <div className="recipes-container">
        <div className="recipes-header">
          <h2 className="recipes-title">
            Your saved <span className="recipes-title-italic">favorites.</span>
          </h2>
          <span className="recipes-count">
            {favoriteRecipes.length} {favoriteRecipes.length === 1 ? 'recipe' : 'recipes'} saved
          </span>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="empty-recipes">
            <p className="empty-title">No favorite recipes yet</p>
            <p className="empty-subtitle">
              Click the heart icon (❤️) on any recipe card to save your favorites here.
            </p>
            <Link to="/#recipes" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Explore recipes
            </Link>
          </div>
        ) : (
          <div className="recipes-grid">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
