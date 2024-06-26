import React, { useState, useEffect } from "react";
import "../styles/qrModal.css";
import "../styles/Mobile.css";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

const ScannedProducts = ({
  products,
  onDetailsClick,
  handleAddToCart,
  user,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  const userHas = (product) => {
    const productAllergensLower = product.allergens_tags.map((allergen) =>
      allergen.toLowerCase().slice(3)
    );
    const userIntoleranceLower = user.intolerance.map((intolerance) =>
      intolerance.toLowerCase()
    );
    console.log("productAllergensLower:", productAllergensLower);
    console.log("userIntoleranceLower:", userIntoleranceLower);
    return productAllergensLower.some((allergen) =>
      userIntoleranceLower.includes(allergen)
    );
  };
  const handleChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <div className="lista-prod">
      <h2 id="scanned-prods">Scanned Products</h2>
      <ul className="product-list">
        {products.slice(0, 5).map((product, index) => (
          <li className="product-list-item" key={index}>
            <img
              src={product.image_front_url}
              alt={product.product_name}
              style={{ width: "30px" }}
            />
            <p>{product.product_name}</p>
            {userHas(product) && (
              <p className="allergen-warning">
                {" "}
                <span
                  className="popup-warning"
                  onMouseEnter={() => setShowWarning(true)}
                  onMouseLeave={() => setShowWarning(false)}
                >
                  <ExclamationTriangleFill color={"red"} size={"30px"} />
                  {showWarning && (
                    <div className="warning-tooltip">
                      Warning: Contains allergens
                    </div>
                  )}
                </span>
              </p>
            )}
            <button
              className="btn-details"
              onClick={() => onDetailsClick(index)}
            >
              <span>Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
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
              onClick={() => handleAddToCart(index, quantity)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-basket basket"
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScannedProducts;
