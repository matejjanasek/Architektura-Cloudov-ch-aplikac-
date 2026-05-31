import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";

import { MedicalEntriesContext } from "../medicalEntries/MedicalEntries-Provider";
import MedicalEntryItem from "../medicalEntries/MedicalEntry-Item";

function PassportMedicalDetail({
  passportId,
  itemList,
  setMedicalEntryFormData,
  setMedicalEntryDeleteDialog,
}) {
  const { data } = useContext(MedicalEntriesContext);

  return (
    <Accordion.Item eventKey={passportId} style={{ width: "100%" }}>
      <Accordion.Header className="p-0">
        <Stack direction="horizontal" gap={2}>
          <div>Passport ID: {passportId}</div>
        </Stack>
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          {itemList?.map((item) => {
            return (
              <MedicalEntryItem
                key={item.id}
                item={item}
                setMedicalEntryFormData={setMedicalEntryFormData}
                setMedicalEntryDeleteDialog={setMedicalEntryDeleteDialog}
              />
            );
          })}
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default PassportMedicalDetail;