import "./ProfileAddress.css";
import { useAddress } from "../../../index";

export const ProfileAddress = () => {
  const {
    addressState: { address },
  } = useAddress();

  return (
    <div className="profileAddress_page">
      <div className="profileAddress_header">
        <h2>My Addresses</h2>
        <button>
          <h3>Add New Address</h3>
        </button>
      </div>
      <hr />
      <ul className="profileAddress_list">
        {address?.map((add) => {
          const { id, name, area, city, state, pincode, phoneNumber } = add;
          return (
            <li key={id}>
              <p>{name}</p>
              <p>{area}</p>
              <p>
                {city}, {state}, {pincode}
              </p>
              <p>{phoneNumber}</p>
              <div>
                <button className="profileAddress_edit_btn">Edit</button>
                <button className="profileAddress_delete_btn">Delete</button>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
