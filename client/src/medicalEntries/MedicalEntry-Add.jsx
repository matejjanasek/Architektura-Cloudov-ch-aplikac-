import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { MedicalEntriesContext } from "../medicalEntries/MedicalEntries-Provider";

function MedicalEntryAdd() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { handlerMap, state } = useContext(MedicalEntriesContext);

  
const [formData, setFormData] = useState({
  procedure: "",
  date: "",
  desc: "",
  passportId: id, 
});
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlerMap.handleCreate(formData);
    navigate(`/passport/Passport-Detail/${id}`); 
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h2>Add Medical Entry</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Procedure</Form.Label>
            <Form.Control 
              required 
              value={formData.procedure} 
              onChange={(e) => setFormData({...formData, procedure: e.target.value})} 
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" 
              required 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={formData.desc} 
              onChange={(e) => setFormData({...formData, desc: e.target.value})} 
            />
          </Form.Group>

          <Button type="submit" disabled={state === "creating"}>
            {state === "creating" ? "Saving..." : "Save Entry"}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default MedicalEntryAdd;