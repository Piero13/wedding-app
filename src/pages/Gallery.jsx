import { useEffect, useState } from "react";
import { fetchPhotos } from "../services/guest/galleryService";

import GalleryGrid from "../features/photos/GalleryGrid";
import PhotoModal from "../features/photos/PhotoModal";
import Filters from "../features/photos/Filters";
import { Pagination, Spinner } from "react-bootstrap";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const data = await fetchPhotos();
      setPhotos(data);
      setFiltered(data);
      setLoading(false);
    };

    loadPhotos();
  }, []);

  /**
   * Search
   */
  const handleSearch = (value) => {
    const result = photos.filter((p) =>
      (p.title + p.description)
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setFiltered(result);
    setPage(1); // reset pagination
  };

  /**
   * Filter by category
   */
  const handleCategory = (catId) => {
    if (!catId) {
      setFiltered(photos);
      return;
    }

    const result = photos.filter((p) => p.category_id === catId);

    setFiltered(result);
    setPage(1);
  };

  /**
   * Pagination
   */
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return  <Spinner 
              className="d-block mx-auto mt-5"
              variant="primary"
            >
              <span className="visually-hidden">Chargement...</span>
            </Spinner>;
  }

  return (
    <div className="container py-4">
        <h2 className="hero-title mb-4 text-center text-primary">Galerie Photo</h2>

      <Filters
        onSearch={handleSearch}
        onCategory={handleCategory}
      />

      <GalleryGrid
        photos={paginated}
        onSelect={(photo) =>
          setSelectedIndex(filtered.findIndex((p) => p.id === photo.id))
        }
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === page}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      <PhotoModal
        photos={filtered}
        initialIndex={selectedIndex}
        onHide={() => setSelectedIndex(null)}
      />

    </div>
  );
}