import { Image, Row, Col } from "react-bootstrap";

/**
 * Gallery grid
 */
export default function GalleryGrid({ photos, onSelect }) {
  return (
    <Row>
      {photos.map((photo) => (
        <Col xs={6} md={3} key={photo.id} className="mb-3">
          <Image
            src={photo.thumbnail_url}
            fluid
            onClick={() => onSelect(photo)}
            style={{ cursor: "pointer" }}
          />
        </Col>
      ))}
    </Row>
  );
}