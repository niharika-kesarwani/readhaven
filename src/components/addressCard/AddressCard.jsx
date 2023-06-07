import { useAddress } from "../../index";
import "./AddressCard.css";
import { addressTypes } from "../../constants/addressTypes";

export const AddressCard = ({ address }) => {
  const { _id, area, city, name, phoneNumber, pincode, state } = address;
  const { SELECT_ADDRESS_CHECKOUT } = addressTypes;

  const {
    addressState: { selectedAddressId },
    addressDispatch,
  } = useAddress();

  return (
    <div
      className={
        selectedAddressId === _id
          ? "addressCard_page addressCard_page_selected"
          : "addressCard_page"
      }
      onClick={() =>
        addressDispatch({ type: SELECT_ADDRESS_CHECKOUT, payload: _id })
      }
    >
      <input
        type="radio"
        name="addressCard_radio"
        checked={selectedAddressId === _id}
        onChange={() =>
          addressDispatch({ type: SELECT_ADDRESS_CHECKOUT, payload: _id })
        }
      />
      <div>
        <h3>{name}</h3>
        <p>{area}</p>
        <p>{city}</p>
        <p>
          {state} - {pincode}
        </p>
        <p>{phoneNumber}</p>
      </div>
    </div>
  );
};
