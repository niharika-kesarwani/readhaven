import { addressTypes } from "../constants/AddressTypes";

const { DISPLAY_ADDRESSES } = addressTypes;

export const addressReducer = (state, { type, payload }) => {
  switch (type) {
    case DISPLAY_ADDRESSES:
      return { ...state, address: payload };
    default:
      return state;
  }
};

export const initialAddressState = {
  address: [],
};
