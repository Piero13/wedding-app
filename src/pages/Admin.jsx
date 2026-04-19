import { useEffect, useState } from "react";
import { fetchPhotos as fetchPhotosService } from "../services/admin/adminService";
import UploadForm from "../features/admin/UploadForm";
import PhotoList from "../features/admin/PhotoList";
import GuestbookModeration from "../features/admin/GuestbookModeration";

export default function Admin() {
    const [photos, setPhotos] = useState([]);

    const loadPhotos = async () => {
        try {
            const data = await fetchPhotosService();
            setPhotos(data);
        } catch (err) {
            console.error("Error fetching photos:", err);
        }
    };

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
    }, []);;
    
    return (
        <div className="container py-5">
        <h2>Admin Dashboard</h2>

        <UploadForm onUploadSuccess={loadPhotos}/>
        <PhotoList photos={photos} refresh={loadPhotos}/>
        <GuestbookModeration />
        </div>
    );
}