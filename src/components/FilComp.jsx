import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const fetchProducts = (searchValue, categoryValue) => {
    // Log values here to debug in your browser console
    console.log("Filtering by:", { search: searchValue, category: categoryValue });

    axios
      .get(`${import.meta.env.VITE_API_URL}/products`, {
        params: {
          search: searchValue,
          categorie: categoryValue, // Ensure your backend expects 'categorie'
        },
      })
      .then((res) => {
        // Accessing data based on standard Laravel/API pagination structures
        setProducts(res.data.data || res.data); 
      })
      .catch((err) => console.error("API Error:", err));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        fetchProducts(value, category);
      }, 500)
    );
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    // Trigger filter immediately on category change
    fetchProducts(search, value);
  };

  useEffect(() => {
    fetchProducts("", "");
  }, []);

  return (
    <div className="msone-main-container fade-in-up">
      <div className="msone-container-inner">
        <div className="msone-surface-card">
          <header className="msone-card-header">
            <h2 className="msone-card-title">Product Inventory</h2>
          </header>

          <div className="msone-filter-bar">
            <input 
              className="msone-input" 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={handleSearch} 
            />
            
            <select 
              className="msone-select" 
              value={category} 
              onChange={handleCategory}
            >
              <option value="">All categories</option>
              {/* IMPORTANT: These values MUST match your Database strings exactly */}
              <option value="Phones">Phones</option>
              <option value="Laptops">Laptops</option>
              <option value="Accessories">Accessories</option>
              <option value="Components">Components</option>
            </select>
          </div>

          <div className="msone-table-container">
            <table className="msone-table">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td className="msone-td-img-free">
                        <img 
                          src={p.image} 
                          alt={p.nom} 
                          className="msone-img-hero-free" 
                        />
                      </td>
                      <td className="msone-td-name">{p.nom}</td>
                      <td><span className="msone-category-badge">{p.categorie}</span></td>
                      <td className="msone-td-price">${p.prix}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}