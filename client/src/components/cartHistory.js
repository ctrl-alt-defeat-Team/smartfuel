import React from 'react';


const CartHistory = ({ cartHistory, setShowHistory }) => {
  return (
    <div>
      <div> <button onClick={() => setShowHistory(false)}> goBack </button> </div>
      <div className="cart-history">
    {cartHistory.map((cartHistory, index) => (
          <div key={index} className="cart-element">
            <div className="date">{cartHistory}</div>
            <div className="product-count">{cartHistory} products</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartHistory;