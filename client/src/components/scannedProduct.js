
import React from 'react';

const ScannedProduct = ({ product }) => {
  const imageURL = product.image_front_url;
    const name = product.product_name;
  return (
    <div className="scanned-product">
      <h2>{name}</h2>
      <img src={imageURL} alt={name} />
    </div>
  );
};

export default ScannedProduct;
