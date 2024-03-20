import React, { useState } from "react";
import Cart from "./cart";
import "../styles/cartHistory.css";

const CartHistory = ({
  cartHistory,
  setShowHistory,
  showCartFromHistory,
  setShowCartFromHistory,
  selectedCart,
  setSelectedCart,
}) => {
  const handleSelectedCart = (index) => {
    setSelectedCart(cartHistory[index]);
    setShowCartFromHistory(true);
  };

  return (
    (!showCartFromHistory && (
      <div className="history-container">
        <div className="history-buttons">
          <div>
            <button
              className="btn-back-profile"
              onClick={() => setShowHistory(false)}
            >
              {" "}
              Back{" "}
            </button>
          </div>
        </div>
        <div className="cart-history">
          <h2>Cart History</h2>
          {cartHistory.map((cart, index) => (
            <div key={index} className="cart-element">
              <div className="date">{cart.date}</div>
              <div className="product-count">
                {cart.products.length} products
              </div>
              <button
                className="show-cart-btn"
                onClick={() => {
                  handleSelectedCart(index);
                }}
              >
                Show Cart
              </button>
            </div>
          ))}
        </div>
        <br />
      </div>
    )) ||
    (showCartFromHistory && (
      <Cart cart={selectedCart} setShowCart={setShowCartFromHistory} />
    ))
  );
};

export default CartHistory;
