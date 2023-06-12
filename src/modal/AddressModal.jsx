import "./AddressModal.css";
import { useAddress } from "../index";
import { addressTypes } from "../constants/addressTypes";
import { v4 as uuid } from "uuid";

export const AddressModal = () => {
  const {
    addressState: { address, addressFormData },
    addressDispatch,
    addToAddress,
    editAddress,
  } = useAddress();

  const { SET_SHOW_ADDRESS_MODAL, SET_ADDRESS_DETAILS, SET_DUMMY_ADDRESS } =
    addressTypes;

  const { _id, name, area, city, state, pincode, phoneNumber } =
    addressFormData;

  const dummyAddress = {
    name: "Niharika Kesarwani",
    area: "13, M. G. Road",
    city: "Nasik",
    state: "Maharashtra",
    pincode: "422005",
    phoneNumber: "1234567890",
  };

  const handleInput = (e) => {
    addressDispatch({
      type: SET_ADDRESS_DETAILS,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const isAddressPresent = address?.find(
      (singleAdd) => singleAdd._id === addressFormData._id
    );
    if (isAddressPresent) {
      editAddress(isAddressPresent._id, addressFormData);
    } else {
      addToAddress(addressFormData);
    }
    addressDispatch({ type: SET_SHOW_ADDRESS_MODAL, payload: false });
  };

  return (
    <div className="addressModal" onClick={(e) => e.stopPropagation()}>
      <h2>Address</h2>
      <form onSubmit={handleAddressSubmit}>
        <label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name || ""}
            className="input"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Area"
            name="area"
            value={area || ""}
            className="input"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city || ""}
            className="input"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="State"
            name="state"
            value={state || ""}
            className="input"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Pincode"
            name="pincode"
            min="100000"
            max="999999"
            value={pincode || ""}
            className="input"
            onChange={handleInput}
            required
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Phone No."
            name="phoneNumber"
            min="1000000000"
            max="9999999999"
            value={phoneNumber || ""}
            className="input"
            onChange={handleInput}
            required
          />
        </label>
        <div>
          <button type="submit">
            <p>Submit</p>
          </button>
          <button
            onClick={() =>
              addressDispatch({ type: SET_SHOW_ADDRESS_MODAL, payload: false })
            }
          >
            <p>Cancel</p>
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            addressDispatch({
              type: SET_DUMMY_ADDRESS,
              payload:
                _id !== ""
                  ? { ...dummyAddress, _id: _id }
                  : { ...dummyAddress, _id: uuid() },
            })
          }
        >
          <p>Fill with Dummy Values</p>
        </button>
      </form>
    </div>
  );
};
