import { createContext, useContext, useEffect, useReducer } from "react";
import { AddressService } from "../services/address-service/AddressService";
import { AddAddressService } from "../services/address-service/AddAddressService";
import { EditAddressService } from "../services/address-service/EditAddressService";
import { RemoveAddressService } from "../services/address-service/RemoveAddressService";
import { useAuth } from "../index";
import {
  addressReducer,
  initialAddressState,
} from "../reducers/AddressReducer";
import { addressTypes } from "../constants/AddressTypes";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { token } = useAuth();
  const { DISPLAY_ADDRESSES } = addressTypes;

  const [addressState, addressDispatch] = useReducer(
    addressReducer,
    initialAddressState
  );

  const getAllAddress = async () => {
    try {
      const response = await AddressService(token);
      const {
        status,
        data: { address },
      } = response;
      if (status === 200) {
        addressDispatch({
          type: DISPLAY_ADDRESSES,
          payload: address,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToAddress = async (newAddress) => {
    try {
      const response = await AddAddressService(newAddress, token);
      const {
        status,
        data: { address },
      } = response;
      if (status === 201) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editAddress = async () => {
    try {
      const response = await EditAddressService(
        1,
        addressState.address[0],
        token
      );
      const {
        status,
        data: { address },
      } = response;
      if (status === 201) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeAddress = async () => {
    try {
      const response = await RemoveAddressService(1, token);
      const {
        status,
        data: { address },
      } = response;
      if (status === 200) {
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  return (
    <AddressContext.Provider
      value={{ addressState, addToAddress, editAddress, removeAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
