import "./Checkout.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAddress, useCart } from "../../index";
import { AddressCard } from "../../components/addressCard/AddressCard";
import { Loader } from "../../components/loader/Loader";
import { Error } from "../../components/error/Error";
import { addressTypes } from "../../constants/addressTypes";
import { AddressModal } from "../../modal/AddressModal";
import { initialAddressFormData } from "../../reducers/addressReducer";

export const Checkout = () => {
  const {
    SET_SHOW_ADDRESS_MODAL,
    RESET_ADDRESS_DETAILS,
    SELECT_ADDRESS_CHECKOUT,
  } = addressTypes;

  const {
    isLoadingAddress,
    isErrorAddress,
    addressState: { address, showAddressModal, selectedAddressId },
    addressDispatch,
  } = useAddress();

  const {
    cartState: { cart },
    emptyCart,
    totalPrice,
    totalDiscount,
  } = useCart();

  const navigate = useNavigate();

  const selectedAddress =
    address?.find((add) => add._id === selectedAddressId) ??
    initialAddressFormData;

  const { _id, area, city, name, phoneNumber, pincode, state } =
    selectedAddress;

  const addNewAddressHandler = () => {
    addressDispatch({ type: SET_SHOW_ADDRESS_MODAL, payload: true });
    addressDispatch({
      type: RESET_ADDRESS_DETAILS,
      payload: initialAddressFormData,
    });
  };

  const placeOrderBtnHandler = () => {
    if (selectedAddressId === null) {
      toast.error("Please select an address for checking out!");
    } else if (cart?.length === 0) {
      toast.error("Please add something to cart for checking out!");
      navigate("/cart");
    } else {
      toast.success("Order successfully placed!");
      emptyCart();
      navigate("/");
    }
  };

  useEffect(() => {
    addressDispatch({ type: SELECT_ADDRESS_CHECKOUT, payload: null });
  }, []);

  return (
    <div className="checkout_page">
      <h1>Checkout</h1>
      {isLoadingAddress ? (
        <Loader />
      ) : isErrorAddress ? (
        <Error />
      ) : (
        <div className="checkout_content">
          <div className="checkout_address">
            <h2>Select Address</h2>
            <ul>
              {address?.map((indAddress) => (
                <AddressCard key={indAddress?._id} address={indAddress} />
              ))}
            </ul>
            <button
              className="checkout_address_btn"
              onClick={() => addNewAddressHandler()}
            >
              Add New Address
            </button>
          </div>
          <div className="checkout_order_summary">
            <div>
              <h2>Order Summary</h2>
              <hr />
              <div className="checkout_row">
                <h3>Book ({cart?.length})</h3>
                <h3>Quantity</h3>
              </div>
              {cart?.map(({ _id, title, qty }) => (
                <div key={_id} className="checkout_row">
                  <p>{title}</p>
                  <p>{qty}</p>
                </div>
              ))}
            </div>
            <div className="checkout_price">
              <h3>Price Details</h3>
              <hr />
              <div className="checkout_row">
                <h3>Total Price</h3>
                <h3>{totalPrice}</h3>
              </div>
              <div className="checkout_row">
                <h3>Total Discount</h3>
                <h3>- {totalDiscount}</h3>
              </div>
              <div className="checkout_row">
                <h3>Grand Total</h3>
                <h2>{totalPrice - totalDiscount}</h2>
              </div>
            </div>
            {selectedAddressId !== null && (
              <div>
                <h3>Delivery Details</h3>
                <hr />
                <h3>{name}</h3>
                <p>{area}</p>
                <p>
                  {city}, {state}, {pincode}
                </p>
                <p>{phoneNumber}</p>
              </div>
            )}
            <button onClick={() => placeOrderBtnHandler()}>Place Order</button>
          </div>
          {showAddressModal && (
            <div
              className="checkout_addAddress_modal"
              onClick={() =>
                addressDispatch({
                  type: SET_SHOW_ADDRESS_MODAL,
                  payload: false,
                })
              }
            >
              <AddressModal />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
