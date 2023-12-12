import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./MessageModal.css";
import Spinner from "react-bootstrap/Spinner";

function MessageModal({ mes, show, onClear, handler, isLoading }) {
  
  const confirmButton = () => {
    if (isLoading === undefined) {
      return (
        <Button variant="primary" onClick={handler}>
          Confirm
        </Button>
      );
    } else {
      return (
        <>
          {!isLoading && (
            <Button variant="primary" onClick={handler}>
              Confirm
            </Button>
          )}
          {isLoading && (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Loading...
            </Button>
          )}
        </>
      );
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClear}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mes}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClear}
            className="close-button"
          >
            Close
          </Button>
          {confirmButton()}
          {/* <Button variant="primary" onClick={handler}>
            Confirm
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;
