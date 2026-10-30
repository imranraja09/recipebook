import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand-link">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="RecipeBook Icon" className="navbar-logo-icon" />
          <span className="navbar-brand-text">recipebook</span>
        </Link>

        <div className="navbar-actions">
          <Link
            to="/#recipes"
            className={`nav-link ${location.pathname === '/' && !location.hash.includes('favorites') ? 'active' : ''}`}
            onClick={() => {
              if (location.pathname === '/') {
                const el = document.getElementById('recipes');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Explore
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            Favorites
          </Link>
          <Link to="/add" className="btn-add-recipe">
            + Add recipe
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
