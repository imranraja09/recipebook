import { useState } from 'react';

const CATEGORY_OPTIONS = ['Dinner', 'Lunch', 'Breakfast', 'Dessert', 'Snack', 'Drinks'];
const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

const FOOD_PRESETS = [
  { label: '🍝 Pasta', url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80' },
  { label: '🥗 Salad', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { label: '🍕 Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
  { label: '🍔 Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { label: '🍛 Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
  { label: '🍰 Dessert', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  { label: '🍲 Soup', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80' },
];

function RecipeForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dinner');
  const [cookingTime, setCookingTime] = useState('25 min');
  const [difficulty, setDifficulty] = useState('Easy');
  const [servings, setServings] = useState('2 servings');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
  const [imageStatus, setImageStatus] = useState('idle'); // 'idle' | 'valid' | 'error'
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  // Handle URL changes with automatic cleaning & validation
  const handleUrlChange = (value) => {
    const trimmed = value.trim();
    setImage(trimmed);

    if (!trimmed) {
      setImageStatus('idle');
      return;
    }

    // Test load the image URL
    const testImg = new Image();
    testImg.onload = () => {
      setImageStatus('valid');
    };
    testImg.onerror = () => {
      setImageStatus('error');
    };
    testImg.src = trimmed;
  };

  // Handle File Upload from computer/phone with canvas compression
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress to max 800px dimension JPEG to preserve localStorage space
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);

        setImage(compressedBase64);
        setImageStatus('valid');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (presetUrl) => {
    setImageMode('url');
    handleUrlChange(presetUrl);
  };

  const handleClearImage = () => {
    setImage('');
    setImageStatus('idle');
  };

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
      image: image.trim(),
      ingredients,
      instructions,
    });

    // Reset Form
    setTitle('');
    setCategory('Dinner');
    setCookingTime('25 min');
    setDifficulty('Easy');
    setServings('2 servings');
    setDescription('');
    setImage('');
    setImageStatus('idle');
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

      {/* Recipe Image Picker Section */}
      <div className="form-group image-picker-group">
        <div className="image-picker-header">
          <label>Recipe Image</label>
          <div className="image-mode-tabs">
            <button
              type="button"
              className={`mode-tab-btn ${imageMode === 'url' ? 'active' : ''}`}
              onClick={() => setImageMode('url')}
            >
              🔗 Paste URL
            </button>
            <button
              type="button"
              className={`mode-tab-btn ${imageMode === 'upload' ? 'active' : ''}`}
              onClick={() => setImageMode('upload')}
            >
              📁 Upload from Device
            </button>
          </div>
        </div>

        {imageMode === 'url' ? (
          <div className="image-url-section">
            <input
              id="image-url"
              type="url"
              placeholder="Paste direct image URL (e.g. https://images.unsplash.com/...)"
              value={image.startsWith('data:') ? '' : image}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            {imageStatus === 'error' && (
              <p className="image-help-msg error">
                ⚠️ Yeh link load nahi ho rahi. Direct image address copy karein ya &quot;Upload from Device&quot; use karein.
              </p>
            )}
            {imageStatus === 'valid' && !image.startsWith('data:') && (
              <p className="image-help-msg success">✓ Image URL kamyabi se load ho gayi!</p>
            )}

            {/* Quick Unsplash Presets */}
            <div className="presets-container">
              <span className="presets-title">⚡ Quick Unsplash Food:</span>
              <div className="preset-buttons">
                {FOOD_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="preset-btn"
                    onClick={() => handleSelectPreset(p.url)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="image-upload-section">
            <label htmlFor="file-upload-input" className="file-dropzone">
              <span className="dropzone-icon">📷</span>
              <span className="dropzone-text">Apne computer / phone se picture select karein</span>
              <span className="dropzone-hint">Supports JPG, PNG, WebP (Auto-compressed)</span>
            </label>
            <input
              id="file-upload-input"
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={handleFileUpload}
            />
          </div>
        )}

        {/* Live Image Preview */}
        {image && (
          <div className="image-preview-card">
            <div className="preview-img-wrapper">
              <img
                src={image}
                alt="Recipe Preview"
                className="preview-img"
                onError={() => setImageStatus('error')}
              />
            </div>
            <div className="preview-details">
              <span className="preview-badge">
                {image.startsWith('data:') ? '📁 Device Image Ready' : '🔗 Web Image Ready'}
              </span>
              <button
                type="button"
                className="btn-clear-image"
                onClick={handleClearImage}
              >
                ✕ Remove Image
              </button>
            </div>
          </div>
        )}
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
