import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  // Fetch products from the Fake Store API when the app loads.
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong! Please check your internet and try again.");
        setLoading(false);
      });
  }, []);

  // Save favorites in the browser's localStorage.
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a product to favorites or remove it.
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Apply the search and favorites filters.
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFavorite =
      !showFavorites || favorites.includes(product.id);

    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="app">
      <header className="site-header">
        <h1>Mini Product Explorer</h1>
        <p>Explore products from Fake Store API</p>
      </header>

      <main>
        <div className="controls">
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button
            onClick={() => setShowFavorites(false)}
            className={!showFavorites ? "active" : ""}
          >
            All Products
          </button>

          <button
            onClick={() => setShowFavorites(true)}
            className={showFavorites ? "active" : ""}
          >
            Favorites ({favorites.length})
          </button>
        </div>

        {loading && <h2 className="message">Loading products...</h2>}
        {error && <h2 className="error">{error}</h2>}

        {!loading && !error && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />

                <h3>{product.title}</h3>

                <p className="price">${product.price.toFixed(2)}</p>

                <p>Rating: ⭐ {product.rating.rate}</p>

                <button
                  className="favorite-btn"
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites.includes(product.id)
                    ? "❤️ Remove Favorite"
                    : "🤍 Add Favorite"}
                </button>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <h2 className="message">No products found!</h2>
        )}
      </main>

      <footer>
        <p>Mini Product Explorer | Built with React + Vite</p>
      </footer>
    </div>
  );
}

export default App;