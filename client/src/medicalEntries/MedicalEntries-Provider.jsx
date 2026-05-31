import { createContext, useState, useEffect } from "react";

import FetchHelper from "../fetch-helper.js";

export const MedicalEntriesContext = createContext();

function MedicalEntriesProvider({ children }) {
  const [filter, setFilter] = useState({}); 
  const [medicalEntriesDto, setMedicalEntriesDto] = useState({
    state: "ready",
    data: null,
    error: null,
  });

async function handleLoad() {
  setMedicalEntriesDto((current) => ({ ...current, state: "pending" }));
  
  // Directly pass filter to your list method
  const result = await FetchHelper.medicalEntries.list(filter);
  
  setMedicalEntriesDto((current) => {
    if (result.ok) {
      return { ...current, state: "ready", data: result.data, error: null };
    } else {
      return { ...current, state: "error", error: result.data };
    }
  });
}

  useEffect(() => {
    handleLoad();
  }, [filter]);

  async function handleCreate(dtoIn) {
    setMedicalEntriesDto((current) => ({ ...current, state: "pending" }));
    
    const result = await FetchHelper.medicalEntries.create(dtoIn);
    
    setMedicalEntriesDto((current) => {
      if (result.ok) {
        const newData = { ...current.data, itemList: [...current.data.itemList, result.data] };
        return { ...current, state: "ready", data: newData, error: null };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }   
  async function handleDelete(dtoIn) {
    setMedicalEntriesDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.medicalEntries.delete(dtoIn);
    setMedicalEntriesDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  const value = {
    ...medicalEntriesDto,
    filter,
    setFilter,
    handlerMap: { handleLoad, handleCreate, handleDelete },
  };

  return (
    <MedicalEntriesContext.Provider value={value}>
      {children}
    </MedicalEntriesContext.Provider>
  );
}

export default MedicalEntriesProvider;
