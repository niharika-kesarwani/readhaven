import "./ProfileAddress.css";
import { useAddress } from "../../../index";
import { AddressModal } from "../../../modal/AddressModal";
import { addressTypes } from "../../../constants/addressTypes";
import { initialAddressFormData } from "../../../reducers/addressReducer";
import { Loader } from "../../../components/loader/Loader";
import { Error } from "../../../components/error/Error";

export const ProfileAddress = () => {
  const {
    isLoadingAddress,
    isErrorAddress,
    addressState: { address, showAddressModal },
    addressDispatch,
    removeAddress,
  } = useAddress();

  const { SET_SHOW_ADDRESS_MODAL, EDIT_ADDRESS, RESET_ADDRESS_DETAILS } =
    addressTypes;

  const editAddressHandler = (addressToEdit) => {
    addressDispatch({ type: SET_SHOW_ADDRESS_MODAL, payload: true });
    addressDispatch({ type: EDIT_ADDRESS, payload: addressToEdit });
  };

  const addNewAddressHandler = () => {
    addressDispatch({ type: SET_SHOW_ADDRESS_MODAL, payload: true });
    addressDispatch({
      type: RESET_ADDRESS_DETAILS,
      payload: initialAddressFormData,
    });
  };

  return (
    <div className="profileAddress_page">
      <div className="profileAddress_header">
        <h2>My Addresses</h2>
        <button onClick={() => addNewAddressHandler()}>
          <h3>Add New Address</h3>
        </button>
      </div>
      <hr />
      {isLoadingAddress ? (
        <Loader />
      ) : isErrorAddress ? (
        <Error />
      ) : (
        <ul className="profileAddress_list">
          {address?.map((add, index) => {
            const { _id, name, area, city, state, pincode, phoneNumber } = add;
            return (
              <li key={_id}>
                <p>{name}</p>
                <p>{area}</p>
                <p>
                  {city}, {state}, {pincode}
                </p>
                <p>{phoneNumber}</p>
                <div>
                  <button
                    className="profileAddress_edit_btn"
                    onClick={() => editAddressHandler(add)}
                  >
                    Edit
                  </button>
                  <button
                    className="profileAddress_delete_btn"
                    onClick={() => removeAddress(_id)}
                  >
                    Delete
                  </button>
                </div>
                {index < address?.length - 1 && <hr />}
              </li>
            );
          })}
        </ul>
      )}
      {showAddressModal && (
        <div
          className="profileAddress_modal"
          onClick={() =>
            addressDispatch({ type: SET_SHOW_ADDRESS_MODAL, payload: false })
          }
        >
          <AddressModal />
        </div>
      )}
    </div>
  );
};
