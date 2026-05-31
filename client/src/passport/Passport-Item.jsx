import { PassportContext } from "./Passport-Provider";
import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { mdiPlus, mdiLoading, mdiCheckBold, mdiDeleteOutline } from "@mdi/js";
import DeleteConfirmationDialog from "./Delete-Confirmation-Dialog";

function PassportItem({ data }) {
  console.log("PassportItem received data:", data);
  const { state, handlerMap } = useContext(PassportContext);
  const [name, setName] = useState(data?.name || "");
  const [microChip, setMicroChip] = useState(data?.microChip || "");
  const [species, setSpecies] = useState(data?.species || "Canine");
  const [nameOwner, setNameOwner] = useState(data?.nameOwner || "");
  const [breed, setBreed] = useState(data?.breed || "");
  const [gender, setGender] = useState(data?.gender || "Male");
  const [desc, setDesc] = useState(data?.desc || "");
  
  const breedOptions = {
    "Canine": ["Golden Retriever", "Labrador", "Border Collie"],
    "Feline": ["Persian", "Maine Coon", "European Shorthair"],
    "Small Mammals": ["Hamster", "Rabbit", "Mice"]
  };
  
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);

   useEffect(() => {
    if (data) {
      setName(data.name || "");
      setMicroChip(data.microChip || "");
      setSpecies(data.species || "Canine");
      setNameOwner(data.nameOwner || "");
      setBreed(data.breed || "");
      setGender(data.gender || "Male");
      setDesc(data.desc || "" );
    }
  }, [data]);

  const handleCreate = async () => {
    const payload = { name, microChip, species, breed, gender, nameOwner, desc };
    console.log("Sending payload to backend:", payload); // <-- ADD THIS
    
    try {
      await handlerMap.handleCreate(payload);
      console.log("Create request completed"); // <-- ADD THIS
    } catch (err) {
      console.error("Error inside handleCreate:", err); // <-- ADD THIS
    }
  
    ;
    setName("");
    setMicroChip("");
    setSpecies("Canine");
    setGender("Male"); 
    setBreed("");
    setNameOwner("");
    setDesc("");
  };
 
  const handleDelete = async() =>{
    await handlerMap.handleDelete({
    })
  }

  return (
  
      <div className="d-flex flex-column gap-3">
  
  {/* Row 1: Primary identifiers */}
  <Row>
    <Col md={6}>
      <Form.Control placeholder="Pet name" value={name} onChange={(e) => setName(e.target.value)} />
    </Col>
<Col md={6}>
  <Form.Control 
    placeholder="Microchip" 
    value={microChip} 
    onChange={(e) => { 
      const value = e.target.value;
    
      if (/^\d{0,15}$/.test(value)) {
        setMicroChip(value);
      }
    }} 
  />
</Col>
</Row>
  {/* Row 2: Details */}
  <Row>
    <Col md={6}>
      <Form.Control placeholder="Owner Name" value={nameOwner} onChange={(e) => setNameOwner(e.target.value)} />
    </Col>
    <Col md={6}>
      <Form.Control placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
    </Col>
  </Row>

  {/* Row 3: Selectors and Gender */}
  <Row className="align-items-center">
    <Col md={4}>
      <Form.Select value={species} onChange={(e) => { setSpecies(e.target.value); setBreed(""); }}>
        <option value="Canine">Canine</option>
        <option value="Feline">Feline</option>
        <option value="Small Mammals">Small Mammals</option>
      </Form.Select>
    </Col>
    <Col md={4}>
      <Form.Select value={breed} onChange={(e) => setBreed(e.target.value)}>
        <option value="">Select Breed</option>
        {breedOptions[species].map(b => <option key={b} value={b}>{b}</option>)}
      </Form.Select>
    </Col>
    <Col md={2}>
      <div className="d-flex align-items-center gap-3">
        <Form.Check type="radio" label="♂" checked={gender === "Male"} onChange={() => setGender("Male")} />
        <Form.Check type="radio" label="♀" checked={gender === "Female"} onChange={() => setGender("Female")} />
      </div>
    </Col>
    
    {/* Action Button */}
    <Col md={2}>
      <Button variant="primary" onClick={handleCreate} disabled={state === "creating"} className="w-100">
        {state === "creating" ? <Icon path={mdiLoading} spin size={1} /> : "Save Passport"}
      </Button>
    </Col>
  </Row>

</div>
  )}
export default PassportItem;