import { useContext } from "react";
import { PassportContext } from "./Passport-Provider"; 
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Icon from "@mdi/react";
import { mdiPaw, mdiPlus, mdiLoading, mdiCheckBold, mdiDeleteOutline } from "@mdi/js";

function DashboardContent() {
const { data, state, error } = useContext(PassportContext);
const navigate = useNavigate();

  if (state === "loading") {
    return <div className="mt-4">Loading your pet passports...</div>;
  }

  if (state === "error") {
    return <div className="mt-4 text-danger">Error loading passports: {error}</div>;
  }

const passports = data?.itemList || [];

  return (
    
<div className="mt-4">
      <h2 className="mb-2">  Select a Pet</h2>
      
      {passports.length === 0 ? (
        <p className="text-muted">No passports found. Go to the Add new tab to register a new pet!</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {passports.map((pet) => (
            <Col key={pet.id || pet.microChip}>
              <Card className="h-100 shadow-sm border-primary">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <Icon path={mdiPaw} size={1} className="me-2 text-primary" />
                      {pet.name || "Unnamed Pet"}
                    </div>
                    {pet.species && (
                      <Badge bg="info" text="dark" className="ms-2">
                        {pet.species}
                      </Badge>
                    )}
                  </Card.Title>
                
                  <div className="d-flex gap-2 justify-content-start mt-4">
                    <Button variant="primary" onClick={() => navigate(`/passport/Passport-Detail/${pet.microChip}`)}>
                      View Detail
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default DashboardContent;
