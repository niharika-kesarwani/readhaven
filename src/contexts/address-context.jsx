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
import { toast } from "react-hot-toast";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { token } = useAuth();
  const { DISPLAY_ADDRESSES, ADD_TO_ADDRESS, REMOVE_ADDRESS } = addressTypes;

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
        addressDispatch({ type: ADD_TO_ADDRESS, payload: address });
        toast.success("Added new address successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to add new address!");
    }
  };

  const editAddress = async (addressId, newAddress) => {
    try {
      const response = await EditAddressService(addressId, newAddress, token);
      const {
        status,
        data: { address },
      } = response;
      if (status === 201) {
        addressDispatch({ type: DISPLAY_ADDRESSES, payload: address });
        toast.success("Updated address details successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to update address details!");
    }
  };

  const removeAddress = async (addressId) => {
    try {
      const response = await RemoveAddressService(addressId, token);
      const {
        status,
        data: { address },
      } = response;
      if (status === 200) {
        addressDispatch({ type: REMOVE_ADDRESS, payload: address });
        toast.success("Removed address successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to remove address!");
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addressState,
        addressDispatch,
        addToAddress,
        editAddress,
        removeAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
