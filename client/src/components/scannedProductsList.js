import React from "react";
import "../styles/qrModal.css";

const ScannedProducts = ({ products }) => {
  // Slice the array to only show the first 5 products

  return (
    <div>
      <h2>Scanned Products</h2>
      <ul className="product-list">
        {(() => {
          console.log(products);
          const items = [];
          for (let i = 0; i < 5 && i < products.length; i++) {
            items.push(
              <li className="product-list-item" key={i}>
                <img
                  src={products[i].image_front_url}
                  alt={products[i].product_name}
                  style={{ width: "30px" }}
                />
                <p>{products[i].product_name}</p>
                <button className="btn-details">Details</button>
              </li>
            );
          }
          return items;
        })()}
      </ul>
    </div>
  );
};

export default ScannedProducts;
