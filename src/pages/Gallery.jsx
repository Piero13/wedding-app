import { useEffect, useState } from "react";
import {
  fetchPhotos,
} from "../services/guest/galleryService"

import GalleryGrid from "../features/guest/GalleryGrid";
import PhotoModal from "../features/guest/PhotoModal";
import Filters from "../features/guest/Filters";

export default function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selected, setSelected] = useState(null);



    useEffect(() => {
        const loadPhotos = async () => {
        const data = await fetchPhotos();
        setPhotos(data);
        setFiltered(data);
    };
        loadPhotos();
    }, []);

    const handleSearch = (value) => {
        setFiltered(
        photos.filter((p) =>
            (p.title + p.description)
                ?.toLowerCase()
                .includes(value.toLowerCase())
        )
        );
    };

    const handleCategory = (catId) => {
        if (!catId) return setFiltered(photos);

        setFiltered(
        photos.filter((p) => p.category_id === catId)
        );
    };

    return (
        <div className="container py-4">

        <Filters
            onSearch={handleSearch}
            onCategory={handleCategory}
        />

        <GalleryGrid photos={filtered} onSelect={setSelected} />

        <PhotoModal photo={selected} onHide={() => setSelected(null)} />

        </div>
    );
}