import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { MedicalEntriesContext } from "./MedicalEntries-Provider";

function MedicalEntryForm({ item, onClose }) {
  const { state, error, handlerMap } = useContext(MedicalEntriesContext);
  const [procedure, setProcedure] = useState(item?.procedure || "Examination");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);
    

    const payload = {
      procedure: values.procedure,
      date: values.date,
      desc: values.desc,
      passportId: Number(values.passportId),
    };
    

    if (values.procedure === "Vaccine") {
      payload.name = values.name;
      payload.dateEnd = values.dateEnd;
    }

    const result = await handlerMap.handleCreate(payload);
    if (result?.ok) {
      onClose();
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medical Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" && <Alert variant="danger">{error?.message}</Alert>}
          
          
          <input type="hidden" name="passportId" value={item?.passportId || ""} />

          <Form.Group className="mb-3">
            <Form.Label>Procedure</Form.Label>
            <Form.Select 
              name="procedure" 
              value={procedure} 
              onChange={(e) => setProcedure(e.target.value)}
            >
              <option value="Examination">Examination</option>
              <option value="Vaccine">Vaccine</option>
              <option value="Treatment">Treatment</option>
            </Form.Select>
          </Form.Group>

          {procedure === "Vaccine" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Vaccine Name</Form.Label>
                <Form.Control name="name" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" name="dateEnd" required />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" required />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="desc" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button type="submit" disabled={state === "pending"}>Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default MedicalEntryForm;