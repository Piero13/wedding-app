import { supabase } from "../../services/supabase/supabaseClient";
import { Button, Image, Card } from "react-bootstrap";

export default function PhotoList({ photos, refresh }) {

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

            await refresh();
        } catch (err) {
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
                        <Button
                            variant="primary"
                            className="mt-2 w-10 border-primaryDark"
                            onClick={() => deletePhoto(p)}
                        >
                            Supprimer
                        </Button>
                    </Card>
                ))}
            </div>
        </section>
    );
}