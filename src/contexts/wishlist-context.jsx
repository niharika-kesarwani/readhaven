import { createContext, useContext, useEffect, useReducer } from "react";
import { WishlistService } from "../services/wishlist-service/WishlistService";
import { useAuth } from "../index";
import {
  initialWishlistState,
  wishlistReducer,
} from "../reducers/WishlistReducer";
import { wishlistTypes } from "../constants/WishlistTypes";
import { AddToWishlistService } from "../services/wishlist-service/AddToWishlistService";
import { DeleteWishlistService } from "../services/wishlist-service/DeleteWishlistService";
import { toast } from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlistState, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );
  const { DISPLAY_WISHLIST, ADD_TO_WISHLIST, DELETE_FROM_WISHLIST } =
    wishlistTypes;

  const getWishlist = async () => {
    try {
      const response = await WishlistService(token);
      const {
        status,
        data: { wishlist },
      } = response;
      if (status === 200) {
        wishlistDispatch({ type: DISPLAY_WISHLIST, payload: wishlist });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const addToWishlist = async (product) => {
    try {
      const response = await AddToWishlistService(product, token);
      const {
        status,
        data: { wishlist },
      } = response;

      if (status === 201) {
        wishlistDispatch({ type: ADD_TO_WISHLIST, payload: wishlist });
        toast.success("Added to wishlist successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFromWishlist = async ({ _id: productId }) => {
    try {
      const response = await DeleteWishlistService(productId, token);
      const {
        status,
        data: { wishlist },
      } = response;
      if (status === 200) {
        wishlistDispatch({ type: DELETE_FROM_WISHLIST, payload: wishlist });
        toast.success("Deleted from wishlist successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isPresentInWishlist = (product) =>
    wishlistState?.wishlist?.findIndex(({ _id }) => _id === product._id);

  return (
    <WishlistContext.Provider
      value={{
        wishlistState,
        wishlistDispatch,
        addToWishlist,
        isPresentInWishlist,
        deleteFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
