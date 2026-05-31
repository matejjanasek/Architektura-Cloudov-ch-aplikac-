import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPencilOutline, mdiClose } from "@mdi/js";

function MedicalEntryItem({
  item,
  setMedicalEntryFormData,
  setMedicalEntryDeleteDialog,
}) {
return (
    <Col xs={12} md={6} lg={4}>
      <Card className="mb-3">
        <Card.Body>
          <div style={{ position: "relative" }}>
            <strong>{item.procedure}</strong> - {item.name}
            <br />
            {item.desc}
            <br />
            <small className="text-muted">
              Date: {new Date(item.date).toLocaleDateString("cs")}
            </small>
            {item.dateEnd && (
              <>
                <br />
                <small className="text-muted">
                  End Date: {new Date(item.dateEnd).toLocaleDateString("cs")}
                </small>
              </>
            )}
            
            <div style={{ position: "absolute", top: "0", right: "0" }}>
              <Button
                className="border-0 p-1"
                variant="outline-danger"
                size="sm"
                onClick={() => setMedicalEntryDeleteDialog(item)}
              >
                <Icon path={mdiClose} size={0.8} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MedicalEntryItem;
