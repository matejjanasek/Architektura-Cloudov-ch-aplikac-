import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteConfirmationDialog({
  showDeleteConfirmationDialog,
  setShowDeleteConfirmationDialog,
  handleDelete,
}) {
  return (
    <Modal 
      show={Boolean(showDeleteConfirmationDialog)} 
      onHide={() => setShowDeleteConfirmationDialog(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Opravdu chceš smazat tento pas ?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Pas <strong>{showDeleteConfirmationDialog?.name || "Bez jména"}</strong> bude smazán.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowDeleteConfirmationDialog(false)}
        >
          Zrušit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete(showDeleteConfirmationDialog?.id || showDeleteConfirmationDialog?.microChip);
            setShowDeleteConfirmationDialog(false);
          }}
        >
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationDialog;