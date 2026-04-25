import { Modal, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Photo modal with Swiper (clean + no ref warning)
 */
export default function PhotoModal({
  photos,
  initialIndex,
  onHide,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!photos || initialIndex === null) return null;

  return (
    <Modal 
      show={initialIndex !== null} 
      onHide={onHide} 
      centered 
      size="lg"
      aria-labellyby="photo-modal-title"
    >
      <Modal.Body className="p-0 bg-light position-relative rounded bs-dark">

        {/* CLOSE */}
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-2 z-3 border-primaryDark bs-dark"
          onClick={onHide}
        >
          <FaTimes className="text-primary fs-5"/>
        </Button>

        <Swiper
          className="bg-gradient-secondaryLight p-4 rounded"
          modules={[Navigation, Pagination]}
          initialSlide={initialIndex || 0}
          spaceBetween={20}
          pagination={{ clickable: true }}
          loop={true}
          onInit={(swiper) => {
            // 🔥 attach navigation AFTER render
            setTimeout(() => {
              if (!prevRef.current || !nextRef.current) return;

              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
        >
          {photos?.map((photo) => (
            <SwiperSlide key={photo.id}>
              <div className="text-center">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  loading="lazy"
                  className="img-fluid w-100"
                />

                <div className="p-3">
                  <h5 id="photo-modal-title">{photo.title}</h5>
                  <p className="text-muted small">
                    {photo.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* NAV ButtonS */}
        <Button
         variant="light"
          ref={prevRef}
          className="bs-dark position-absolute top-50 start-0 ms-2 translate-middle-y z-3 border-primaryDark"
        >
          <FaChevronLeft className="text-primary fs-5"/>
        </Button>

        <Button
          variant="light"
          ref={nextRef}
          className="bs-dark position-absolute top-50 end-0 me-2 translate-middle-y z-3 border-primaryDark"
        >
          <FaChevronRight className="text-primary fs-5"/>
        </Button>

      </Modal.Body>
    </Modal>
  );
}