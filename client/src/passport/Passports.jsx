import PassportProvider from "./Passport-Provider";
import PassportStateResolver from "./Passport-State-Resolver";
import Container from "react-bootstrap/Container";

const Passports = () => {
  return (
    <PassportProvider>
      <Container>
        <PassportStateResolver />
      </Container>
    </PassportProvider>
  );
};

export default Passports;
