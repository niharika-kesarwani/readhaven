import React from "react";
import ReactDOM from "react-dom";
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

export { useAuth, useAddress, useBooks, useCategories, useWishlist };

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AddressProvider>
          <BooksProvider>
            <CategoriesProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </CategoriesProvider>
          </BooksProvider>
        </AddressProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
