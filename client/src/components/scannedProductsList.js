import React from "react";

const ScannedProducts = ({ products }) => {
  // Slice the array to only show the first 5 products

  return (
    <div>
      <h2>Scanned Products</h2>
      <ul>
      {(() => {
        console.log(products);
        const items = [];
        for (let i = 0; i < 5 && i < products.length; i++) {
        items.push(<li key={i}>{products[i].product_name}
        <img
            src={products[i].image_front_url}
            alt={products[i].product_name}
            style={{ width: '30px' }}
        /></li>);
        }
        return items;
        })()}
      </ul>
    </div>
  );
};

export default ScannedProducts;