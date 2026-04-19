import { useState } from "react";
import { uploadImage } from "../../services/admin/uploadService";
import { savePhoto } from "../../services/admin/adminService";
import { Form, Button, Spinner } from "react-bootstrap";

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    try {
      const { image_url, thumbnail_url } = await uploadImage(file);

      await savePhoto({
        title: file.name,
        image_url,
        thumbnail_url,
      });

      // 🔥 refresh parent
      await onUploadSuccess();

      // 🔥 reset input
      setFile(null);
      e.target.reset();

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner size="sm" /> : "Upload"}
      </Button>
    </Form>
  );
}