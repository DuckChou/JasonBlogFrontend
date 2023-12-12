import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CommentModal({ show, error, onClear }) {
  return (
    <>
      <Modal show={show} onHide={onClear}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClear}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentModal;
