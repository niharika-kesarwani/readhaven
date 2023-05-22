import { createContext, useContext } from "react";
import { address } from "../backend/db/address";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  return (
    <AddressContext.Provider value={{ address }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
