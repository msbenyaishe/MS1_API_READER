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
    const token = document.querySelector('meta[name="csrf-token"]')?.content;
    if (token) {
      axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
    }
  }, []);

  const submit = async () => {
    try {
      setError("");
      setLoading(true);

      if (!form.nom.trim() || !form.prix || !form.categorie.trim()) {
        throw new Error("Please fill in all required fields");
      }

      const data = new FormData();
      data.append("nom", form.nom.trim());
      data.append("prix", parseFloat(form.prix));
      data.append("categorie", form.categorie.trim());

      if (form.image) {
        data.append("image", form.image);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/products`, data);

      alert("Product added successfully");
      setForm({ nom: "", prix: "", categorie: "", image: null });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "An error occurred";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="msone-main-container fade-in-up">
      <div className="msone-elegant-wrapper">
        <h2 className="msone-hero-title">Add Product</h2>
        
        {error && <div className="msone-minimal-error">{error}</div>}

        {/* This form is now "Free" with no background or border */}
        <div className="msone-minimal-form-free">
          <div className="msone-field">
            <label className="msone-label">Product Name</label>
            <input
              placeholder="Name"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="msone-input"
            />
          </div>

          <div className="msone-field">
            <label className="msone-label">Price</label>
            <input
              placeholder="Price"
              type="number"
              step="0.01"
              value={form.prix}
              onChange={(e) => setForm({ ...form, prix: e.target.value })}
              className="msone-input"
            />
          </div>

          <div className="msone-field">
            <label className="msone-label">Category</label>
            <input
              placeholder="Category"
              value={form.categorie}
              onChange={(e) => setForm({ ...form, categorie: e.target.value })}
              className="msone-input"
            />
          </div>

          <div className="msone-field">
            <label className="msone-label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] || null })}
              className="msone-input file-input-padding"
            />
          </div>

          <button 
            onClick={submit} 
            disabled={loading} 
            className="btn-msone-modern"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}