import React from "react";
import { useState } from "react";

const ScannedProduct = ({ product, onDetailsClick }) => {
  const imageURL = product.image_front_url;
  const name = product.product_name;

  const [quantity, setQuantity] = useState(1);
  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = (quantity) => {
    const existingCart = localStorage.getItem("cart");
    console.log("existingCart:", existingCart);
    if (
      existingCart !== null &&
      existingCart !== undefined &&
      existingCart !== ""
    ) {
      let data = JSON.parse(existingCart);

      localStorage.setItem(
        "cart",
        JSON.stringify([...data, product._id + quantity])
      );
    } else {
      localStorage.setItem("cart", JSON.stringify([product._id + quantity]));
    }
  };

  return (
    <div className="scanned-product">
      <h2>{name}</h2>
      <img src={imageURL} alt={name} />
      <div className="title-btns scanned-btn">
        <button className="btn-details" onClick={onDetailsClick}>
          <span>Details</span>
        </button>
        <select value={quantity} onChange={handleChange}>
          {[...Array(9).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
        <button
          className="btn-details btn-cart"
          onClick={() => handleAddToCart(quantity)}
        >
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ScannedProduct;
