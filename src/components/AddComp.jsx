import { useState, useEffect } from "react";
import axios from "axios";

export default function AddComp() {
  const [form, setForm] = useState({
    nom: "",
    prix: "",
    categorie: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set CSRF token for all requests
    const token = document.querySelector('meta[name="csrf-token"]')?.content;
    if (token) {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
  }, []);

  const submit = async () => {
    try {
      setError("");
      setLoading(true);

      if (!form.nom.trim() || !form.prix || !form.categorie.trim()) {
        throw new Error("Please fill in all required fields");
      }

      if (isNaN(form.prix) || form.prix <= 0) {
        throw new Error("Price must be a valid positive number");
      }

      const data = new FormData();
      data.append("nom", form.nom.trim());
      data.append("prix", parseFloat(form.prix));
      data.append("categorie", form.categorie.trim());
      
      if (form.image) {
        data.append("image", form.image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        data
      );

      alert("Product added successfully");
      setForm({
        nom: "",
        prix: "",
        categorie: "",
        image: null,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "An error occurred";
      setError(errorMsg);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <div style={{color: "red"}}>{error}</div>}
      
      <input placeholder="Name"
        value={form.nom}
        onChange={e => setForm({...form, nom: e.target.value})} />

      <input placeholder="Price" type="number" step="0.01"
        value={form.prix}
        onChange={e => setForm({...form, prix: e.target.value})} />

      <input placeholder="Category"
        value={form.categorie}
        onChange={e => setForm({...form, categorie: e.target.value})} />

      <input type="file" accept="image/*"
        onChange={e => setForm({...form, image: e.target.files[0] || null})} />

      <button onClick={submit} disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}