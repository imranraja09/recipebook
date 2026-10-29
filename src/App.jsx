import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import './App.css';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/add" element={<AddRecipe />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>Made with love, one recipe at a time.</p>
          </footer>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
