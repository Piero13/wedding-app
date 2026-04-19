import { useState } from "react";
import { uploadImage } from "../../services/admin/uploadService";
import { savePhoto } from "../../services/admin/adminService";
import { Form, Button, Spinner } from "react-bootstrap";
import { useToast } from "../../hooks/useToast";

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    try {
      const { image_url, thumbnail_url, image_path, thumbnail_path } = await uploadImage(file);

      await savePhoto({
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

    } catch (err) {
      showToast("Erreur upload", "danger")
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section className="mb-4">
      <h3 className="fs-4 mb-3">Ajout de photo</h3>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
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
    </section>
  );
}