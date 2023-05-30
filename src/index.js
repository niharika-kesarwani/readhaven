import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import { AddressProvider, useAddress } from "./contexts/address-context";
import { BooksProvider, useBooks } from "./contexts/books-context";
import {
  CategoriesProvider,
  useCategories,
} from "./contexts/categories-context";
import { WishlistProvider, useWishlist } from "./contexts/wishlist-context";
import { CartProvider, useCart } from "./contexts/cart-context";

export { useAuth, useAddress, useBooks, useCategories, useWishlist, useCart };

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AddressProvider>
          <BooksProvider>
            <CategoriesProvider>
              <WishlistProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </WishlistProvider>
            </CategoriesProvider>
          </BooksProvider>
        </AddressProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
