import { useState } from "react";
import { Card, Button, Badge, Row, Col, } from "react-bootstrap";

import { FaEye, FaEyeSlash, FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaSearch, } from "react-icons/fa";

import { deleteCouplePhoto, toggleCouplePhoto, reorderCouplePhotos, } from "../../services/admin/couplePhotosService";

import { supabase } from "../../services/supabase/supabaseClient";

import { useToast } from "../../hooks/useToast";

import CoupleEditPhotoModal from "./CoupleEditPhotoModal";
import PhotoModal from "../photos/PhotoModal";

export default function CouplePhotosList({ photos, refresh, }) {
  const { showToast } = useToast();

  const [selectedPhoto, setSelectedPhoto] =
    useState(null);

  const [previewIndex, setPreviewIndex] =
    useState(null);

  /**
   * Delete complet
   */
  const handleDelete = async (photo) => {
    const confirmDelete =
      window.confirm(
        "Supprimer cette photo ?"
      );

    if (!confirmDelete) return;

    try {
      if (photo.image_path) {
        await supabase.storage
          .from("couple-gallery")
          .remove([
            photo.image_path,
          ]);
      }

      await deleteCouplePhoto(photo.id);

      showToast("Photo supprimée");

      await refresh();

    } catch (err) {
      console.error(err);

      showToast("Erreur suppression", "danger");
    }
  };

  /**
   * Toggle visible
   */
  const handleToggle = async (photo) => {
    try {
      await toggleCouplePhoto(photo);

      await refresh();

    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Move photo
   */
  const movePhoto = async (index, direction) => {
    const newPhotos =
      [...photos];

    const target = direction === "up" ? index - 1 : index + 1;

    if (target < 0 || target >= photos.length) return;

    [
      newPhotos[index],
      newPhotos[target],
    ] = [
      newPhotos[target],
      newPhotos[index],
    ];

    try {
      await reorderCouplePhotos(newPhotos);

      await refresh();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card className="border-primary bs-dark p-4">

        <div className="mb-4">
          <h4 className="mb-1">Galerie actuelle</h4>

          <p className="text-muted mb-0">Gestion des photos visibles.</p>
        </div>

        <Row className="g-3">

          {photos.map(
            (photo, index) => (
              <Col
                md={6}
                key={photo.id}
              >
                <Card className="border-primary h-100 overflow-hidden">

                  <img
                    src={ photo.image_url }
                    alt={ photo.title }
                    className="w-100"
                    style={{ height: "220px", objectFit: "cover", cursor: "pointer", }}
                    onClick={() => setPreviewIndex(index)}
                  />

                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">{ photo.title }</h6>

                        <small className="text-muted">{ photo.description }</small>
                      </div>

                      <Badge bg={photo.is_active ? "primary" : "secondary"}>
                        {photo.is_active ? "Visible" : "Masquée"}
                      </Badge>
                    </div>

                    <div className="d-grid gap-2">
                      <div className="d-flex gap-2">
                        <Button
                          variant="light"
                          className="border-primaryDark flex-fill"
                          onClick={() => setPreviewIndex(index)}
                        >
                          <FaSearch />
                        </Button>

                        <Button
                          variant="light"
                          className="border-primaryDark flex-fill"
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <FaEdit />
                        </Button>

                        <Button
                          variant="light"
                          className="border-primaryDark flex-fill"
                          onClick={() => handleToggle(photo)}
                        >
                          {photo.is_active ? (<FaEyeSlash />) : (<FaEye />)}
                        </Button>
                      </div>

                      <div className="d-flex gap-2">
                        <Button
                          variant="light"
                          className="border-primaryDark flex-fill"
                          onClick={() => movePhoto(index, "up")}
                        >
                          <FaArrowUp />
                        </Button>

                        <Button
                          variant="light"
                          className="border-primaryDark flex-fill"
                          onClick={() => movePhoto(index, "down")}
                        >
                          <FaArrowDown />
                        </Button>

                        <Button
                          variant="danger"
                          className="flex-fill text-light border-primaryDark"
                          onClick={() => handleDelete(photo)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>

                  </Card.Body>
                </Card>
              </Col>
            )
          )}

        </Row>

      </Card>

      {/* EDIT */}
      <CoupleEditPhotoModal
        photo={selectedPhoto}
        onHide={() => setSelectedPhoto(null)}
        onSave={refresh}
      />

      {/* PREVIEW */}
      <PhotoModal
        photos={photos}
        initialIndex={previewIndex}
        onHide={() =>setPreviewIndex(null)}
      />
    </>
  );
}