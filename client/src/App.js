import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Passports from "./passport/Passports";
import Dashboard from "./passport/Dashboard";
import PassportDetail from "./passport/Passport-Detail"; 
import PassportProvider from "./passport/Passport-Provider";
import MedicalEntriesProvider from "./medicalEntries/MedicalEntries-Provider";
import MedicalEntryAdd from "./medicalEntries/MedicalEntry-Add"
function App() {
  return (
    <div>
      <BrowserRouter>
        <PassportProvider> 
        <MedicalEntriesProvider>
            <Routes>
              <Route path="/passport/detail/:id" element={<PassportDetail />} />
              <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/Passports" element={<Passports />} />
              <Route path="/passport/Passport-Detail/:id" element={<PassportDetail />} />
              <Route path="/medicalEntries/MedicalEntry-Add/:id" element={<MedicalEntryAdd />} />
             </Route>
            </Routes>
          </MedicalEntriesProvider>
        </PassportProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
