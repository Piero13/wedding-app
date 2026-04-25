import { useState } from "react";
import { supabase } from "../../services/supabase/supabaseClient";
import { useToast } from "../../hooks/useToast";
import { Button, Image, Card, Badge } from "react-bootstrap";
import EditPhotoModal from "./EditPhotoModal";
import { approvePhoto } from "../../services/admin/adminService";

export default function PhotoList({ photos, refresh }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { showToast } = useToast();

  const deletePhoto = async (photo) => {
    try {
      // 🔥 delete storage
      await supabase.storage
        .from("wedding-gallery")
        .remove([
          photo.image_path,
          photo.thumbnail_path,
        ]);

      // 🔥 delete DB
      await supabase
        .from("photos")
        .delete()
        .eq("id", photo.id);

      showToast("Photo supprimée");

      await refresh();
    } catch (err) {
      showToast("Erreur suppression", "danger");
      console.error("Error deleting photo:", err);
    }
  };

  const handleApprove = async (photoId) => {
    try {
      await approvePhoto(photoId);
      showToast("Photo validée ✅");
      await refresh();
    } catch (err) {
      showToast("Erreur validation", "danger");
      console.error(err);
    }
  };

  return (
    <section>
      <h3 className="fs-4 mb-3">Galerie photo</h3>

      <div className="d-flex flex-wrap">
        {photos.map((p) => (
          <Card
            key={p.id}
            className="d-flex flex-column align-items-center justify-content-between p-2 m-2 border-primary"
            style={{ width: "180px" }}
          >
            <Image src={p.thumbnail_url} width={150} />

            {/* 🔥 statut */}
            <div className="mt-2">
              {p.is_approved ? (
                <Badge bg="success">Validée</Badge>
              ) : (
                <Badge bg="warning" text="dark">
                  En attente
                </Badge>
              )}
            </div>

            <div className="mt-2 d-flex flex-column align-items-center w-100">

              {/* ✅ bouton validation uniquement si non validé */}
              {!p.is_approved && (
                <Button
                  size="sm"
                  variant="success"
                  className="w-100 mb-1"
                  onClick={() => handleApprove(p.id)}
                >
                  Valider
                </Button>
              )}

              {/* ✏️ modifier (toujours présent) */}
              <Button
                size="sm"
                variant="secondary"
                className="w-100 mb-1 border-primaryDark"
                onClick={() => setSelectedPhoto(p)}
              >
                Modifier
              </Button>

              {/* 🗑 supprimer */}
              <Button
                size="sm"
                variant="primary"
                className="w-100 border-primaryDark"
                onClick={() => deletePhoto(p)}
              >
                Supprimer
              </Button>

            </div>
          </Card>
        ))}
      </div>

      <EditPhotoModal
        key={selectedPhoto?.id}
        photo={selectedPhoto}
        onHide={() => setSelectedPhoto(null)}
        onSave={refresh}
      />
    </section>
  );
}