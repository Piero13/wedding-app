import { Modal, Image } from "react-bootstrap";

/**
 * Fullscreen photo modal
 */
export default function PhotoModal({ photo, onHide }) {
  return (
    <Modal show={!!photo} onHide={onHide} centered size="lg">
      <Modal.Body className="text-center p-0">

        <Image src={photo?.image_url} fluid />

        <div className="p-3">
          <h5>{photo?.title}</h5>
          <p>{photo?.description}</p>
        </div>

      </Modal.Body>
    </Modal>
  );
}