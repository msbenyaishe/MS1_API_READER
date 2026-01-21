import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const fetchProducts = (searchValue, categoryValue) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`, {
        params: {
          search: searchValue,
          categorie: categoryValue,
        },
      })
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        fetchProducts(value, category);
      }, 500) // ⏱ wait 500ms
    );
  };

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(value);
    fetchProducts(search, value);
  };

  useEffect(() => {
    fetchProducts("", "");
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search by name"
        onChange={handleSearch}
      />

      <select onChange={handleCategory}>
        <option value="">All categories</option>
        <option value="Phones">Phones</option>
        <option value="Laptops">Laptops</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* TABLE here */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.nom} width="80" />
              </td>
              <td>{p.nom}</td>
              <td>{p.categorie}</td>
              <td>{p.prix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
