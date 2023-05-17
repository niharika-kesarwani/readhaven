import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { BooksProvider, useBooks } from "./contexts/books-context";

export { useBooks };

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BooksProvider>
        <App />
      </BooksProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
