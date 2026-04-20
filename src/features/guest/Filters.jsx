import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchCategories } from "../../services/guest/galleryService";

/**
 * Dynamic filters
 */
export default function Filters({ onSearch, onCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
        const data = await fetchCategories();
        setCategories(data);
    };
    load();
  }, []);



  return (
    <>
      <Form.Control
        placeholder="Rechercher..."
        className="mb-2"
        onChange={(e) => onSearch(e.target.value)}
      />

      <Form.Select onChange={(e) => onCategory(e.target.value)}>
        <option value="">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Form.Select>
    </>
  );
}