import { wishlistTypes } from "../constants/wishlistTypes";

const { DISPLAY_WISHLIST, ADD_TO_WISHLIST, DELETE_FROM_WISHLIST } =
  wishlistTypes;

export const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
    case DISPLAY_WISHLIST:
      return { ...state, wishlist: payload };

    case ADD_TO_WISHLIST:
      const uniqueWishlistArr = payload?.reduce((acc, curr) => {
        const currIndexInAcc = acc?.findIndex(({ _id }) => _id === curr._id);
        return currIndexInAcc === -1 ? [...acc, curr] : acc;
      }, []);
      return { ...state, wishlist: [...uniqueWishlistArr] };

    case DELETE_FROM_WISHLIST:
      return { ...state, wishlist: payload };

    default:
      return state;
  }
};

export const initialWishlistState = {
  wishlist: [],
};
