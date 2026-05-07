import { useState } from "react";
import { Card, Form, Button, Spinner, } from "react-bootstrap";
import { FaUpload, FaImage, } from "react-icons/fa";

import { useToast } from "../../hooks/useToast";
import CropModal from "../../components/common/CropModal";

import { supabase } from "../../services/supabase/supabaseClient";

import { createCouplePhoto, getCouplePhotosCount, } from "../../services/admin/couplePhotosService";

export default function CoupleUploadForm({ onUploadSuccess, }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", });

  /**
   * Choix fichier
   */
  const handleFileChange = (e) => {
    const selected =
      e.target.files?.[0];

    if (!selected) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
      setShowCrop(true);
    };

    reader.readAsDataURL(selected);
  };

  /**
   * Fin crop
   */
  const handleCropDone = (croppedBlob) => {
    const croppedFile =
      new File(
        [croppedBlob],
        "couple-photo.jpg",
        {
          type: "image/jpeg",
        }
      );

    setFile(croppedFile);
    setShowCrop(false);
  };

  /**
   * Upload storage
   */
  const uploadImage = async (imageFile) => {
      const ext = "jpg";

      const fileName = crypto.randomUUID() + "." + ext;

      const path = "originals/" + fileName;

      const { error } = await supabase.storage
          .from("couple-gallery")
          .upload(path, imageFile);

      if (error) throw error;

      const { data } = supabase.storage
          .from("couple-gallery")
          .getPublicUrl(path);

      return {
        image_url: data.publicUrl,
        image_path: path,
      };
    };

  /**
   * Submit
   */
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!file) {
        showToast("Choisis une image", "danger");
        return;
      }

      try {
        setLoading(true);

        const {
          image_url,
          image_path,
        } = await uploadImage(file);

        const total = await getCouplePhotosCount();

        await createCouplePhoto({
          title: form.title || "Souvenir",
          description: form.description,
          image_url,
          image_path,
          is_active: true,
          display_order:
            total + 1,
        });

        showToast("Photo ajoutée ❤️");

        setForm({
          title: "",
          description: "",
        });

        setFile(null);
        setPreview(null);

        if (onUploadSuccess) {
          await onUploadSuccess();
        }

      } catch (err) {
        console.error(err);

        showToast("Erreur upload", "danger");
      }

      setLoading(false);
    };

  return (
    <>
      <Card className="border-primary bs-dark p-4">

        <div className="mb-4">
          <h4 className="mb-1">
            Ajouter une photo
          </h4>

          <p className="text-muted mb-0">Galerie affichée sur la Home.</p>
        </div>

        <Form onSubmit={handleSubmit}>
          {/* TITLE */}
          <Form.Group className="mb-3">
            <Form.Label>
              Titre
            </Form.Label>

            <Form.Control
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              placeholder="Ex : Week-end à Paris"
            />
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              value={ form.description }
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Petit souvenir..."
            />
          </Form.Group>

          {/* FILE */}
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>

          {/* PREVIEW */}
          {file && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="img-fluid rounded"
              />
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-100 border-primaryDark"
            disabled={loading}
          >
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <FaUpload className="me-2" />
                Ajouter
              </>
            )}
          </Button>

        </Form>
      </Card>

      {/* CROP MODAL */}
      <CropModal
        show={showCrop}
        image={preview}
        onClose={() => setShowCrop(false)}
        onCropDone={handleCropDone}
      />
    </>
  );
}