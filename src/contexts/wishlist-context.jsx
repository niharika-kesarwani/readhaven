import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { wishlistService } from "../services/wishlist-service/wishlistService";
import { useAuth } from "../index";
import {
  initialWishlistState,
  wishlistReducer,
} from "../reducers/wishlistReducer";
import { wishlistTypes } from "../constants/wishlistTypes";
import { addToWishlistService } from "../services/wishlist-service/addToWishlistService";
import { deleteWishlistService } from "../services/wishlist-service/deleteWishlistService";
import { toast } from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const { DISPLAY_WISHLIST, ADD_TO_WISHLIST, DELETE_FROM_WISHLIST } =
    wishlistTypes;

  const [wishlistState, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [isErroWishlist, setIsErrorWishlist] = useState(false);

  const getWishlist = async () => {
    setIsLoadingWishlist(true);
    try {
      const response = await wishlistService(token);
      const {
        status,
        data: { wishlist },
      } = response;
      if (status === 200) {
        wishlistDispatch({ type: DISPLAY_WISHLIST, payload: wishlist });
        setIsLoadingWishlist(false);
      }
    } catch (err) {
      setIsErrorWishlist(true);
      console.error(err);
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  useEffect(() => {
    token && getWishlist();
  }, [token]);

  const addToWishlist = async (product) => {
    try {
      const response = await addToWishlistService(product, token);
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
      toast.error("Unable to add to wishlist!");
    }
  };

  const deleteFromWishlist = async ({ _id: productId }) => {
    try {
      const response = await deleteWishlistService(productId, token);
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
      toast.error("Unable to delete from wishlist!");
    }
  };

  const isPresentInWishlist = (product) =>
    wishlistState?.wishlist?.findIndex(({ _id }) => _id === product._id);

  return (
    <WishlistContext.Provider
      value={{
        isLoadingWishlist,
        isErroWishlist,
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
