import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext, DEFAULT_RECIPE_IMAGE } from '../context/RecipeContext';

function RecipeCard({ recipe }) {
  const { toggleFavorite } = useContext(RecipeContext);

  return (
    <div className="recipe-card">
      <div className="recipe-card-media">
        <img
          src={recipe.image || DEFAULT_RECIPE_IMAGE}
          alt={recipe.title}
          className="recipe-card-image"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_RECIPE_IMAGE;
          }}
        />
        {recipe.category && (
          <span className="recipe-card-badge">{recipe.category}</span>
        )}
        <button
          type="button"
          className={`recipe-fav-btn ${recipe.isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          aria-label="Toggle Favorite"
          title={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {recipe.isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="recipe-card-body">
        <div className="recipe-card-meta">
          <span>⏱ {recipe.cookingTime || '20 min'}</span>
          <span className="meta-dot">•</span>
          <span>{recipe.difficulty || 'Easy'}</span>
        </div>

        <h3 className="recipe-card-title">{recipe.title}</h3>

        <p className="recipe-card-desc">
          {recipe.description || recipe.instructions?.slice(0, 90) + '...'}
        </p>

        <div className="recipe-card-footer">
          <span className="recipe-servings">
            👥 {recipe.servings || '2 servings'}
          </span>
          <Link to={`/recipe/${recipe.id}`} className="recipe-view-link">
            View recipe ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
