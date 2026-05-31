import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  const navigate = useNavigate();

  return (
    <Navbar expand="md" bg="primary" data-bs-theme="dark" collapseOnSelect={true}>
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          🐾 PetPassport
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" size="sm" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate("/")}
              active={window.location.pathname === "/"}
            >
              Menu
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/Passports")}
              active={window.location.pathname === "/Passports"}
            >
              Add a Passport
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>   
      </Navbar>
      );
    }
    export default Navigation;