import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const images = [
  "/couple/1.jpg",
  "/couple/2.jpg",
  "/couple/3.jpg",
];

export default function CoupleGallery() {
  return (
    <Container className="py-5">
      <h2 className="text-center text-primary mb-4">
        Nos souvenirs
      </h2>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
                src={src}
                alt="Souvenir couple"
                className="img-fluid rounded shadow-sm"
                style={{
                    aspectRatio: "4/5",
                    objectFit: "cover"
                }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}