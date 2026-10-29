import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import RecipeForm from '../components/RecipeForm';

function AddRecipe() {
  const { addRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  const handleAddRecipe = (newRecipe) => {
    addRecipe(newRecipe);
    navigate('/');
  };

  return (
    <div className="add-recipe-page">
      <div className="add-recipe-wrapper">
        <div className="add-recipe-header">
          <Link to="/" className="back-link">← Back to Explore</Link>
          <h1 className="add-recipe-title">
            Add a new <span className="recipes-title-italic">recipe.</span>
          </h1>
          <p className="add-recipe-subtitle">
            Share your favorite ingredients, cooking time, and instructions.
          </p>
        </div>
        <RecipeForm onSubmit={handleAddRecipe} />
      </div>
    </div>
  );
}

export default AddRecipe;
