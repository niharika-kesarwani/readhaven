import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer, initialCartState } from "../reducers/CartReducer";
import { GetCartService } from "../services/cart-service/GetCartService";
import { AddToCartService } from "../services/cart-service/AddToCartService";
import { DeleteCartService } from "../services/cart-service/DeleteCartService";
import { AddQuantityCartService } from "../services/cart-service/AddQuantityCartService";
import { useAuth } from "../index";
import { cartTypes } from "../constants/CartTypes";
import { toast } from "react-hot-toast";

const { DISPLAY_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY_IN_CART } =
  cartTypes;

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isErrorCart, setIsErrorCart] = useState(false);

  const getCart = async () => {
    setIsLoadingCart(true);
    try {
      const response = await GetCartService(token);
      const {
        status,
        data: { cart },
      } = response;
      if (status === 200) {
        cartDispatch({ type: DISPLAY_CART, payload: cart });
        setIsLoadingCart(false);
      }
    } catch (err) {
      setIsErrorCart(true);
      console.error(err);
    } finally {
      setIsLoadingCart(false);
    }
  };

  useEffect(() => {
    token && getCart();
  }, [token]);

  const isPresentInCart = (product) =>
    cartState?.cart?.findIndex(({ _id }) => _id === product?._id);

  const addToCart = async (product) => {
    try {
      const response = await AddToCartService(product, token);
      const {
        status,
        data: { cart },
      } = response;
      if (status === 201) {
        cartDispatch({ type: ADD_TO_CART, payload: cart });
        toast.success("Added to cart successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to add to cart!");
    }
  };

  const removeFromCart = async (product) => {
    try {
      const response = await DeleteCartService(product._id, token);
      const {
        status,
        data: { cart },
      } = response;
      if (status === 200) {
        cartDispatch({ type: REMOVE_FROM_CART, payload: cart });
        toast.success("Removed from cart successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to remove from cart!");
    }
  };

  const updateQuantityInCart = async (product, actionType) => {
    try {
      const response = await AddQuantityCartService(
        product._id,
        token,
        actionType
      );
      const {
        status,
        data: { cart },
      } = response;
      if (status === 200) {
        cartDispatch({ type: UPDATE_QUANTITY_IN_CART, payload: cart });
        toast.success(
          `${
            actionType === "increment" ? "Increased" : "Reduced"
          } quantity in cart successfully!`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        `Unable to ${
          actionType === "increment" ? "add" : "reduce"
        } quantity in cart!`
      );
    }
  };

  const emptyCart = () => {
    for (let i = 0; i < cartState?.cart?.length; i++) {
      removeFromCart(cartState?.cart[i]);
    }
  };

  const totalPrice = cartState?.cart?.reduce(
    (total, { originalPrice, qty }) => total + originalPrice * qty,
    0
  );

  const totalDiscount = cartState?.cart?.reduce(
    (total, { discountPrice, qty }) => total + discountPrice * qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        isLoadingCart,
        isErrorCart,
        cartState,
        cartDispatch,
        addToCart,
        isPresentInCart,
        removeFromCart,
        updateQuantityInCart,
        emptyCart,
        totalPrice,
        totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
