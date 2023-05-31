import { addressTypes } from "../constants/addressTypes";

const {
  DISPLAY_ADDRESSES,
  SET_SHOW_ADDRESS_MODAL,
  SET_ADDRESS_DETAILS,
  SET_DUMMY_ADDRESS,
  RESET_ADDRESS_DETAILS,
  ADD_TO_ADDRESS,
  EDIT_ADDRESS,
  REMOVE_ADDRESS,
  SELECT_ADDRESS_CHECKOUT,
} = addressTypes;

export const addressReducer = (state, { type, payload }) => {
  switch (type) {
    case DISPLAY_ADDRESSES:
      return {
        ...state,
        address: payload,
      };
    case SET_SHOW_ADDRESS_MODAL:
      return { ...state, showAddressModal: payload };
    case SET_ADDRESS_DETAILS:
      return {
        ...state,
        addressFormData: {
          ...state.addressFormData,
          [payload.name]: payload.value,
        },
      };
    case ADD_TO_ADDRESS:
      return { ...state, address: payload };
    case SET_DUMMY_ADDRESS:
      return { ...state, addressFormData: payload };
    case RESET_ADDRESS_DETAILS:
      return { ...state, addressFormData: payload };
    case EDIT_ADDRESS:
      return { ...state, addressFormData: payload };
    case REMOVE_ADDRESS:
      return { ...state, address: payload };
    case SELECT_ADDRESS_CHECKOUT:
      return { ...state, selectedAddressId: payload };
    default:
      return state;
  }
};

export const initialAddressFormData = {
  _id: "",
  name: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
  phoneNumber: "",
};

export const initialAddressState = {
  address: [],
  addressFormData: initialAddressFormData,
  showAddressModal: false,
  selectedAddressId: null,
};
