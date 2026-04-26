import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import { uploadGuestPhoto } from "../../services/guest/guestUploadService";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import CropModal from "../../components/common/CropModal";

export default function GuestUploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [loading, setLoading] = useState(false);

  const { guest } = useAuth();
  const { showToast } = useToast();

  /**
   * Handle file input → ouvre crop
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
   * Après crop
   */
  const handleCropDone = (croppedBlob) => {
    const croppedFile = new File([croppedBlob], "guest-image.jpg", {
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

    if (!file) {
      showToast("Ajoute une photo 📸", "warning");
      return;
    }

    setLoading(true);

    try {
      await uploadGuestPhoto(file, guest);

      showToast("Photo envoyée ! En attente de validation 📸");

      // reset
      setFile(null);
      setPreview(null);
      e.target.reset();

    } catch (err) {
      console.error(err);
      showToast("Erreur upload", "danger");
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <p className="mb-3">Partagez vos photos <FaCamera className="fs-4 ms-2 mb-2" /></p>
      

      {/* INPUT */}
      <Form.Group className="mb-3">
        <Form.Control type="file" onChange={handleFileChange}  aria-label="upload photo" className="w-100 w-lg-50 mx-lg-auto"/>
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

      {/* SUBMIT */}
      <Button type="submit" disabled={loading} variant="primary" className="border-primaryDark bs-dark w-10 rounded-5">
        {loading ? <Spinner size="sm" /> : "Envoyer"}
      </Button>

      {/* CROP MODAL */}
      <CropModal
        show={showCrop}
        image={preview}
        onClose={() => setShowCrop(false)}
        onCropDone={handleCropDone}
      />
    </Form>
  );
}