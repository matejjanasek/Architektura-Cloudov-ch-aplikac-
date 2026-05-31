import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { PassportContext } from "./Passport-Provider";
import { MedicalEntriesContext } from "../medicalEntries/MedicalEntries-Provider";
import FetchHelper from "../fetch-helper.js";



function PassportDetail() {
  const { id } = useParams();
  const { data: passportData } = useContext(PassportContext);
  const { data: medicalData, setFilter } = useContext(MedicalEntriesContext);
  const [fullPassport, setFullPassport] = useState(null);
  const navigate = useNavigate();
  const { handlerMap } = useContext(PassportContext);


  useEffect(() => {
  const loadFullPassport = async () => {

    const result = await FetchHelper.passport.get({ id });
    if (result.ok) {
     
      setFullPassport(result.data);
    }
  };
  
  loadFullPassport();

  if (!fullPassport) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading pet details...</p>
      </Container>
    );
  
  }
  }, [id]);

useEffect(() => {
  if (id) {

    setFilter({ passportId: id });
  }
  

  return () => setFilter({});
}, [id, setFilter]);
const handleDeletePassport = async () => {

    

    await handlerMap.handleDelete(id);
    

    navigate("/passports"); 
  };

  const passport = passportData?.itemList?.find(p => p.microChip === id);

  if (!passport) return <div>Loading...</div>;


  return (
    <Container className="mt-4">
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
        &larr; Menu
      </Button>

      <Card className="shadow-sm">
        <Card.Body>
          <h1>{fullPassport.name}</h1>
          <p><strong>Microchip:</strong> {fullPassport.microChip}</p>
          <p><strong>Gender:</strong> {fullPassport.gender}</p>
          <p><strong>Species:</strong> {fullPassport.species}</p>
          <p><strong>Breed:</strong> {fullPassport.breed}</p>
          <p><strong>Owner:</strong> {fullPassport.nameOwner}</p>
          <div> <strong>Description:</strong>
            <p>{fullPassport.desc}</p>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="danger" onClick={handleDeletePassport}>
          Delete Passport & Records
        </Button>
        </div>
        </Card.Body>
      </Card>

<div className="d-flex justify-content-between align-items-center mt-4">
  <h3 className="mb-0">Medical Records</h3>
  <Button variant="primary" onClick={() => navigate(`/medicalEntries/MedicalEntry-Add/${id}`)}>
    Add Record
  </Button>
</div>

<hr />
      {medicalData?.itemList?.length > 0 ? (
        medicalData.itemList.map((entry) => (
          <Card key={entry.id} className="mb-2 shadow-sm">
  <Card.Body>
    <div className="d-flex justify-content-between">
      <h5 className="text-primary">{entry.procedure}</h5>
      <small className="text-muted">Date: {entry.date}</small>
    </div>
    
    {/* Only show Vaccine details if it is a vaccine */}
    {entry.procedure === "Vaccine" && (
      <div className="bg-light p-2 rounded">
        <strong>{entry.name}</strong>  <br/>
        <strong>Valid Until:</strong> {entry.dateEnd}
      </div>
    )}
   <p className="mb-1">{entry.desc}</p>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No medical records found for this pet.</p>
      )}
    </Container>
  );
}
export default PassportDetail;