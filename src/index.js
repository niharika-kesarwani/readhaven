import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { BooksProvider, useBooks } from "./contexts/books-context";
import {
  CategoriesProvider,
  useCategories,
} from "./contexts/categories-context";

export { useBooks, useCategories };

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BooksProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </BooksProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
