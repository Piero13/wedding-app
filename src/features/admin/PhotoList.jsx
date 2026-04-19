import { supabase } from "../../services/supabase/supabaseClient";
import { Button, Image } from "react-bootstrap";

export default function PhotoList({ photos, refresh }) {

    const deletePhoto = async (photo) => {
        try {
            await supabase.storage
                .from("wedding-gallery")
                .remove([
                    photo.image_url.split("/").pop(),
                    photo.thumbnail_url.split("/").pop(),
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
        <>
            {photos.map((p) => (
                <div key={p.id}>
                    <Image src={p.thumbnail_url} width={100} />
                    <Button onClick={() => deletePhoto(p)}>Delete</Button>
                </div>
            ))}
        </>
    );
}