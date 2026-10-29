import { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecipeContext, DEFAULT_RECIPE_IMAGE } from '../context/RecipeContext';

function RecipeDetails() {
  const { id } = useParams();
  const { recipes, toggleFavorite, deleteRecipe } = useContext(RecipeContext);

  const recipe = recipes.find((item) => String(item.id) === String(id));

  useEffect(() => {
    if (recipe) {
      console.log('Viewing Recipe Details (JSON):\n' + JSON.stringify(recipe, null, 2));
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="recipe-details-page">
        <div className="recipe-details-card">
          <div className="recipe-details-body">
            <h2 className="recipe-details-title">Recipe Not Found</h2>
            <Link to="/" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      <div className="recipe-details-card">
        <div className="recipe-details-media">
          <img
            src={recipe.image || DEFAULT_RECIPE_IMAGE}
            alt={recipe.title}
            className="recipe-details-image"
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
            onClick={() => toggleFavorite(recipe.id)}
            title={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {recipe.isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="recipe-details-body">
          <div className="recipe-details-meta">
            <span>⏱ {recipe.cookingTime || '20 min'}</span>
            <span className="meta-dot">•</span>
            <span>{recipe.difficulty || 'Easy'}</span>
            <span className="meta-dot">•</span>
            <span>👥 {recipe.servings || '2 servings'}</span>
          </div>

          <h1 className="recipe-details-title">{recipe.title}</h1>

          {recipe.description && (
            <p className="recipe-details-desc">{recipe.description}</p>
          )}

          <div className="recipe-details-section">
            <h3 className="section-heading">Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.split(',').map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-details-section">
            <h3 className="section-heading">Instructions</h3>
            <p className="instructions-text">{recipe.instructions}</p>
          </div>

          <div className="recipe-details-actions">
            <Link to="/" className="btn-secondary">
              ← Back to Recipes
            </Link>
            <button
              type="button"
              className="btn-danger-outline"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this recipe?')) {
                  deleteRecipe(recipe.id);
                  window.location.href = '/';
                }
              }}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
