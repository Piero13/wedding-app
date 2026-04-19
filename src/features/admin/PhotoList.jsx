import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase/supabaseClient";
import { fetchPhotos as fetchPhotosService } from "../../../services/adminService";
import { Button, Image } from "react-bootstrap";

export default function PhotoList() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await fetchPhotosService();
                setPhotos(data);
            } catch (err) {
                console.error("Error fetching photos:", err);
            }
        };

        loadPhotos();
    }, []);

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

            // refresh
            const data = await fetchPhotosService();
            setPhotos(data);
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