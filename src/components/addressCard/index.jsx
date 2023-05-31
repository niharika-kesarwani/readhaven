import { useAddress } from "../../index";
import "./AddressCard.css";
import { addressTypes } from "../../constants/AddressTypes";

export const AddressCard = ({ address }) => {
  const { _id, area, city, name, phoneNumber, pincode, state } = address;
  const { SELECT_ADDRESS_CHECKOUT } = addressTypes;

  const { addressDispatch } = useAddress();

  return (
    <div className="addressCard_page">
      <input
        type="radio"
        name="addressCard_radio"
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
