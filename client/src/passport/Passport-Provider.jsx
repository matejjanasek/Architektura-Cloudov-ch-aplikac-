import { createContext, useState, useEffect } from "react";
import FetchHelper from "../fetch-helper.js";

export const PassportContext = createContext();

const PassportProvider = ({ children }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState();

  const fetchPassport = async () => {
    setState("loading");
    try {
      const result = await FetchHelper.passport.list();
      if (result.ok) {
        setData(result.data);
        setState("success");
      } else {
        setError(result.data?.message || "Failed to fetch passports");
        setState("error");
      }
    } catch (err) {
      setError(err.message);
      setState("error");
    }
  };

  useEffect(() => {
    fetchPassport();
  }, []);

  const handleCreate = async (passportInput) => {
    setState("creating");
    try {
      const result = await FetchHelper.passport.create(passportInput);
      if (result.ok) {
        fetchPassport();
        setState("success"); 
      } else {
        setError(result.data?.message || "Failed to create passport");
        setState("errorCreating");
      }
    } catch (err) {
      setError(err.message);
      setState("errorCreating");
    }
  };

  const handleDelete = async (id) => {
    setState("deleting_" + id);
    try {
      const result = await FetchHelper.passport.delete({ id });
      if (result.ok) {
        await fetchPassport();
        setData((currentData) => {
          const updatedList = currentData.itemList.filter((item) => item.id !== id);
          return { ...currentData, itemList: updatedList };
        });
        setState("success");
      } else {
        setError(result.data?.message || "Failed to delete passport");
        setState("errorDeleting");
      }
    } catch (err) {
      setError(err.message);
      setState("errorDeleting");
    }
  };

  return (
    <PassportContext.Provider
      value={{
        data,
        state,
        error,
        handlerMap: {
          handleCreate,
          handleDelete,
          fetchPassport,
        },
      }}
    >
      {children}
    </PassportContext.Provider>
  );
};
export default PassportProvider