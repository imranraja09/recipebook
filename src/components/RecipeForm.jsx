import { useState } from 'react';

const CATEGORY_OPTIONS = ['Dinner', 'Lunch', 'Breakfast', 'Dessert', 'Snack', 'Drinks'];
const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

function RecipeForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dinner');
  const [cookingTime, setCookingTime] = useState('25 min');
  const [difficulty, setDifficulty] = useState('Easy');
  const [servings, setServings] = useState('2 servings');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      return;
    }

    onSubmit({
      title,
      category,
      cookingTime,
      difficulty,
      servings,
      description,
      image,
      ingredients,
      instructions,
    });

    setTitle('');
    setCategory('Dinner');
    setCookingTime('25 min');
    setDifficulty('Easy');
    setServings('2 servings');
    setDescription('');
    setImage('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Recipe Title *</label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Creamy Tomato Pasta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group flex-1">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="form-select"
          >
            {DIFFICULTY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="cookingTime">Cooking Time</label>
          <input
            id="cookingTime"
            type="text"
            placeholder="e.g. 25 min"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </div>

        <div className="form-group flex-1">
          <label htmlFor="servings">Servings</label>
          <input
            id="servings"
            type="text"
            placeholder="e.g. 2 servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Short Description</label>
        <input
          id="description"
          type="text"
          placeholder="e.g. A comforting pasta tossed in a silky tomato sauce..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL (Unsplash)</label>
        <input
          id="image"
          type="url"
          placeholder="https://images.unsplash.com/... (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients (comma separated) *</label>
        <textarea
          id="ingredients"
          rows="3"
          placeholder="e.g. Pasta, Olive Oil, Garlic, Tomatoes, Fresh Basil"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions *</label>
        <textarea
          id="instructions"
          rows="4"
          placeholder="Write step-by-step cooking instructions..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-submit-recipe">
        Save Recipe
      </button>
    </form>
  );
}

export default RecipeForm;
