import Container from "react-bootstrap/esm/Container";
import PassportProvider from "./Passport-Provider";
import DashboardContent from "./Dashboard-Content"; 

function Dashboard() {
  return (
    <Container>
      <PassportProvider>  
        <DashboardContent /> 
      </PassportProvider>
    </Container>
  );
}

export default Dashboard;