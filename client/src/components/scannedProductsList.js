import React,{useState, useEffect} from "react";
import "../styles/qrModal.css";

const ScannedProducts = ({ products, onDetailsClick, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);


  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

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

            <select value={quantity} onChange={handleChange}>
              {[...Array(9).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>

            <button
              className="btn-details"
              onClick={() => handleAddToCart(index, quantity)}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScannedProducts;
