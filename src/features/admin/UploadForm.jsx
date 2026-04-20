import { useState, useEffect } from "react";
import { uploadImage } from "../../services/admin/uploadService";
import { savePhoto, fetchCategories } from "../../services/admin/adminService";
import { Form, Button, Spinner } from "react-bootstrap";
import { useToast } from "../../hooks/useToast";

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    decription: "",
    category_id: "",
  })
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    try {
      const { image_url, thumbnail_url, image_path, thumbnail_path } = await uploadImage(file);

      await savePhoto({
        ...form,
        title: file.name,
        image_url,
        thumbnail_url,
        image_path,
        thumbnail_path,
      });

      showToast("Upload terminé")

      // 🔥 refresh parent
      await onUploadSuccess();

      // 🔥 reset input
      setFile(null);
      e.target.reset();
      setForm({ title: "", decription: "", category_id: "" })

    } catch (err) {
      showToast("Erreur upload", "danger")
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="mb-4 ">
      <h3 className="fs-4 mb-3">Ajout de photo</h3>
      <Form
        className="d-flex flex-column align-items-center align-items-lg-start"
        onSubmit={handleSubmit}
      >
        <Form.Group className="w-100">
          <Form.Label className="mb-1">Titre</Form.Label>
          <Form.Control
            className="mb-3"
            placeholder="Titre"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="w-100">
          <Form.Label className="mb-1">Description</Form.Label>
          <Form.Control
            className="mb-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="w-100">
          <Form.Label className="mb-1">Catégorie</Form.Label>
          <Form.Select
            className="mb-3"
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
          >
            <option value="">Sélectionner catégorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 w-100">
          <Form.Label className="mb-1">Fichier</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>

        <Button 
          variant="primary"
          className="w-10 border-primaryDark"
          type="submit"
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Upload"}
        </Button>
      </Form>
    </div>
  );
}