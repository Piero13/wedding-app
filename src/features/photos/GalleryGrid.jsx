import { Image, Row, Col } from "react-bootstrap";

/**
 * Gallery grid
 */
export default function GalleryGrid({ photos, onSelect }) {
  return (
    <Row>
      {photos.map((photo) => (
        <Col xs={6} md={3} key={photo.id} className="mb-3">
          <div className="border border-primary rounded overflow-hidden">
            <Image
              src={photo.thumbnail_url}
              alt={photo.title}
              fluid
              loading="lazy"
              decoding="async"
              onClick={() => onSelect(photo)}
              style={{ cursor: "pointer" }}
              className="galleryPic"
            />
          </div>
        </Col>
      ))}
    </Row>
  );
}