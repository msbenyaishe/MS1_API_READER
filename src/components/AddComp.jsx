import { useState } from "react";
import axios from "axios";

export default function AddComp() {
  const [form, setForm] = useState({
    nom: "",
    prix: "",
    categorie: "",
    image: null,
  });

  const submit = async () => {
    const data = new FormData();
    data.append("nom", form.nom);
    data.append("prix", form.prix);
    data.append("categorie", form.categorie);
    data.append("image", form.image);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/products`,
      data
    );

    alert("Product added successfully");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input placeholder="Name"
        onChange={e => setForm({...form, nom: e.target.value})} />

      <input placeholder="Price"
        onChange={e => setForm({...form, prix: e.target.value})} />

      <input placeholder="Category"
        onChange={e => setForm({...form, categorie: e.target.value})} />

      <input type="file"
        onChange={e => setForm({...form, image: e.target.files[0]})} />

      <button onClick={submit}>Add Product</button>
    </div>
  );
}
