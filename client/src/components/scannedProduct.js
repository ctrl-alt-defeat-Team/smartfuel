
import React, {useState} from 'react';

const ScannedProduct =  ({ product,  onDetailsClick, handleAddToCart}) =>  {
  
  const [quantity, setQuantity] = useState(1);


  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

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
        <select value={quantity} onChange={handleChange}>
              {[...Array(9).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
        <button className="btn-details btn-cart" onClick={()=>{handleAddToCart(-1,quantity)}}>
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ScannedProduct;
