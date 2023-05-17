import "./Books.css";
import { useParams } from "react-router";
import { useBooks } from "../../index.js";

export const Books = () => {
  const { category } = useParams();
  const { products } = useBooks();

  return (
    <div className="books">
      <div className="books-filters">Filters</div>
      <div className="books-list">List</div>
    </div>
  );
};
