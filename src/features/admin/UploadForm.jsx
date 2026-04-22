import { useState, useEffect } from "react";
import { uploadImage } from "../../services/admin/uploadService";
import { savePhoto, fetchCategories } from "../../services/admin/adminService";
import { Form, Button, Spinner } from "react-bootstrap";
import { useToast } from "../../hooks/useToast";
import CropModal from "../../components/common/CropModal";

/**
 * Upload form with crop
 */
export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
  });

  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  /**
   * Load categories
   */
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  /**
   * Handle file input
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
      setShowCrop(true);
    };

    reader.readAsDataURL(selectedFile);
  };

  /**
   * After crop
   */
  const handleCropDone = (croppedBlob) => {
    const croppedFile = new File([croppedBlob], "image.jpg", {
      type: "image/jpeg",
    });

    setFile(croppedFile);
    setShowCrop(false);
  };

  /**
   * Submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    try {
      const {
        image_url,
        thumbnail_url,
        image_path,
        thumbnail_path,
      } = await uploadImage(file);

      await savePhoto({
        ...form,
        title: form.title || file.name,
        image_url,
        thumbnail_url,
        image_path,
        thumbnail_path,
      });

      showToast("Upload terminé");

      await onUploadSuccess();

      // reset
      setFile(null);
      setPreview(null);
      setForm({ title: "", description: "", category_id: "" });
      e.target.reset();

    } catch (err) {
      console.error(err);
      showToast("Erreur upload", "danger");
    }

    setLoading(false);
  };

  return (
    <div className="mb-4">
      <h3 className="fs-4 mb-3">Ajout de photo</h3>

      <Form onSubmit={handleSubmit}>

        {/* TITLE */}
        <Form.Group className="mb-3">
          <Form.Label>Titre</Form.Label>
          <Form.Control
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </Form.Group>

        {/* CATEGORY */}
        <Form.Group className="mb-3">
          <Form.Label>Catégorie</Form.Label>
          <Form.Select
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
          >
            <option value="">Sélectionner</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* FILE */}
        <Form.Group className="mb-3">
          <Form.Label>Fichier</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        {/* PREVIEW */}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="mb-3"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        )}

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Upload"}
        </Button>
      </Form>

      {/* CROP MODAL */}
      <CropModal
        show={showCrop}
        image={preview}
        onClose={() => setShowCrop(false)}
        onCropDone={handleCropDone}
      />
    </div>
  );
}