import { useState } from "react";
import { supabase } from "../../services/supabase/supabaseClient";
import { useToast } from "../../hooks/useToast";
import { Button, Image, Card } from "react-bootstrap";
import EditPhotoModal from "./EditPhotoModal";

export default function PhotoList({ photos, refresh }) {
    const[selectedPhoto, setSelectedPhoto] = useState(null);
    const { showToast } = useToast();


    const deletePhoto = async (photo) => {
        try {
            await supabase.storage
                .from("wedding-gallery")
                .remove([
                    photo.image_path,
                    photo.thumbnail_path,
                ]);

            await supabase
                .from("photos")
                .delete()
                .eq("id", photo.id);
            
            showToast("Photo supprimée");

            await refresh();
        } catch (err) {
            showToast("Erreur suppression", "danger")
            console.error("Error deleting photo:", err);
        }
    };

    return (
        <section>
            <h3 className="fs-4 mb-3">Liste des photos</h3>

            <div className="d-flex">
                {photos.map((p) => (
                    <Card 
                        key={p.id}
                        className="d-flex flex-column align-items-center justify-content-between p-2 mx-1 border-primary"
                    >
                        <Image src={p.thumbnail_url} width={100} />

                        <div className="mt-2 d-flex flex-column align-items-center">
                            <Button
                                variant="secondary"
                                className="w-10 border-primaryDark"
                                onClick={() => setSelectedPhoto(p)}
                            >
                                Modifier
                            </Button>
                            <Button
                                variant="primary"
                                className="mt-2 w-10 border-primaryDark"
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