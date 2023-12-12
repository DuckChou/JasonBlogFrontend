import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ErrorModal({ error,  onClear }) {
  return (
    <>
      <Modal show={!!error} onHide={onClear}>
        <Modal.Header closeButton>
          <Modal.Title>Error occurs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error === "Authentication failed!"
            ? "please login first for leave a comment"
            : error}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClear}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorModal;
