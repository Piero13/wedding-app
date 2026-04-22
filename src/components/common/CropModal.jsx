import { useState } from "react";
import Cropper from "react-easy-crop";
import { Modal, Button } from "react-bootstrap";
import { getCroppedImg } from "../../utils/cropImage";
import { FaMobileAlt, FaImage } from "react-icons/fa";

/**
 * Crop image modal with aspect toggle
 */
export default function CropModal({ show, image, onClose, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 3); // défaut paysage
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /**
   * Called when crop is complete
   */
  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  /**
   * Toggle portrait / paysage
   */
  const toggleAspect = () => {
    setAspect((prev) => (prev === 4 / 3 ? 3 / 4 : 4 / 3));

    // reset UX propre
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  /**
   * Validate crop
   */
  const handleValidate = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    onCropDone(croppedImage);
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Body style={{ position: "relative", height: 400 }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={toggleAspect}>
          {aspect === 4 / 3 ? (
            <>
              <FaMobileAlt className="me-2" />
              Portrait
            </>
          ) : (
            <>
              <FaImage className="me-2" />
              Paysage
            </>
          )}
        </Button>

        <div>
          <Button variant="secondary" onClick={onClose} className="me-2">
            Annuler
          </Button>

          <Button variant="primary" onClick={handleValidate}>
            Valider
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}