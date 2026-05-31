import { useContext } from "react";
import { PassportContext } from "./Passport-Provider";
import PassportItem from "./Passport-Item";

function PassportAddView() {
  const { state, error, handlerMap } = useContext(PassportContext);

  if (state === "loading") {
    return <div className="mt-4">Initializing form...</div>;
  }
  
  if (state === "error") {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="passport-add-wrapper py-4">
      <h2>Register New Pet Passport</h2>
      
      <div className="bg-light p-3 rounded mb-4 border border-secondary-subtle">
        <h5 className="text-primary mb-3">➕ Add New Pet Passport</h5>
        <PassportItem data={null} handlerMap={handlerMap} />
      </div>
    </div>
  );
}

export default PassportAddView;