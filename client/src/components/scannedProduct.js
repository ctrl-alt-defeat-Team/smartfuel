
import React from 'react';

const ScannedProduct =  ({ product,  onDetailsClick, handleAddToCart}) =>  {
  
  const imageURL = product.image_front_url;
    const name = product.product_name;
  return (
    <div className="scanned-product">
      <h2>{name}</h2>
      <img src={imageURL} alt={name} />
      <div className="title-btns scanned-btn">
        <button className="btn-details" onClick={onDetailsClick}>
          <span>Details</span>
        </button>
        <button className="btn-details btn-cart" onClick={handleAddToCart}>
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ScannedProduct;
