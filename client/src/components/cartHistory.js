import React,{useState} from 'react';
import Cart from './cart';

const CartHistory = ({ cartHistory, setShowHistory, showCartFromHistory, setShowCartFromHistory, selectedCart, setSelectedCart }) => {

const handleSelectedCart = (index) => {
  setSelectedCart(cartHistory[index]);
  setShowCartFromHistory(true);
}

  return (
    (!showCartFromHistory &&
    <div>
      <div> <button onClick={() => setShowHistory(false)}> goBack </button> </div>
      <div className="cart-history">
    {cartHistory.map((cart, index) => (
          <div key={index} className="cart-element">
            <div className="date">{cart.date}</div>
            <div className="product-count">{cart.products.length} products</div>
            <button onClick={()=>{handleSelectedCart(index)}}> Show Cart </button>
          </div>
        ))}
      </div>
      <br/>
    </div>) || (showCartFromHistory &&  <Cart cart={selectedCart} setShowCart = {setShowCartFromHistory} />)
  );
};

export default CartHistory;