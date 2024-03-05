import React from "react";
import "../styles/Cart.css";
import { StarFill, Trash } from "react-bootstrap-icons";

function CartProduct({ prodObj, onDelete }) {
  const handleDelete = () => {
    onDelete(prodObj.id); // Assuming prodObj has an id
  };

  return (
    <div className="cart-product">
      <div className="btn-remove-div">
        <button className="btn-remove" onClick={handleDelete}>
          <Trash />
        </button>
      </div>
      <img src={prodObj.image} alt="product" />
      <div className="product-info">
        <h3>{prodObj.name}</h3>
        <div className="rating-details">
          <p>
            {prodObj.rating}{" "}
            <span className="star">
              <StarFill />
            </span>
          </p>
          <button className="btn-details">Details</button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
