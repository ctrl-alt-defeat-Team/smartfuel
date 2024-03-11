import React from "react";
import "../styles/qrModal.css";

const ScannedProducts = ({ products, onDetailsClick }) => {
  // Slice the array to only show the first 5 products

  return (
    <div>
      <h2>Scanned Products</h2>
      <ul className="product-list">
        {products.slice(0, 5).map((product, index) => (
          <li className="product-list-item" key={index}>
            <img
              src={product.image_front_url}
              alt={product.product_name}
              style={{ width: "30px" }}
            />
            <p>{product.product_name}</p>
            <button
              className="btn-details"
              onClick={() => onDetailsClick(index)}
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScannedProducts;
