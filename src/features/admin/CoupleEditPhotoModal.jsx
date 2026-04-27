import { useState } from "react";

import {
  Modal,
  Button,
  Form,
} from "react-bootstrap";

import { updateCouplePhoto } from "../../services/admin/couplePhotosService";

export default function CoupleEditPhotoModal({
  photo,
  onHide,
  onSave,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave =
    async () => {
      if (!photo) return;

      await updateCouplePhoto(
        photo.id,
        form
      );

      await onSave();
      onHide();
    };

  return (
    <Modal
      show={!!photo}
      onHide={onHide}
      centered
    >
      <Modal.Body>
        <h4 className="mb-4">
          Modifier photo
        </h4>

        <Form.Group className="mb-3">
          <Form.Label>
            Titre
          </Form.Label>

          <Form.Control
            value={
              photo
                ? form.title ||
                  photo.title ||
                  ""
                : ""
            }
            onChange={(e) =>
              handleChange(
                "title",
                e.target.value
              )
            }
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>
            Description
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            value={
              photo
                ? form.description ||
                  photo.description ||
                  ""
                : ""
            }
            onChange={(e) =>
              handleChange(
                "description",
                e.target.value
              )
            }
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            className="w-100"
            onClick={onHide}
          >
            Annuler
          </Button>

          <Button
            variant="primary"
            className="w-100 border-primaryDark"
            onClick={
              handleSave
            }
            disabled={!photo}
          >
            Enregistrer
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}