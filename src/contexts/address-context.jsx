import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { addressService } from "../services/address-service/addressService";
import { addAddressService } from "../services/address-service/addAddressService";
import { editAddressService } from "../services/address-service/editAddressService";
import { removeAddressService } from "../services/address-service/removeAddressService";
import { useAuth } from "../index";
import {
  addressReducer,
  initialAddressState,
} from "../reducers/addressReducer";
import { addressTypes } from "../constants/addressTypes";
import { toast } from "react-hot-toast";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { token } = useAuth();
  const { DISPLAY_ADDRESSES, ADD_TO_ADDRESS, REMOVE_ADDRESS } = addressTypes;

  const [addressState, addressDispatch] = useReducer(
    addressReducer,
    initialAddressState
  );
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isErrorAddress, setIsErrorAddress] = useState(false);

  const getAllAddress = async () => {
    setIsLoadingAddress(true);
    try {
      const response = await addressService(token);
      const {
        status,
        data: { address },
      } = response;
      if (status === 200) {
        addressDispatch({
          type: DISPLAY_ADDRESSES,
          payload: address,
        });
        setIsLoadingAddress(false);
      }
    } catch (err) {
      setIsErrorAddress(true);
      console.error(err);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const addToAddress = async (newAddress) => {
    try {
      const response = await addAddressService(newAddress, token);
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
      const response = await editAddressService(addressId, newAddress, token);
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
      const response = await removeAddressService(addressId, token);
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
    token && getAllAddress();
  }, [token]);

  return (
    <AddressContext.Provider
      value={{
        isLoadingAddress,
        isErrorAddress,
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
