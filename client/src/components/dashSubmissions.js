import React from "react";
import CartProduct from "./cartProduct";
import "../styles/Dashboard.css";
import { useState } from "react";

function DashSubmissions() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      rating: 4,
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      rating: 3,
    },
    {
      id: 3,
      name: "Product 3",
      image: "https://via.placeholder.com/150",
      rating: 5,
    },
    {
      id: 4,
      name: "Product 4",
      image: "https://via.placeholder.com/150",
      rating: 5,
    },
    {
      id: 5,
      name: "Product 5",
      image: "https://via.placeholder.com/150",
      rating: 5,
    },
  ]);

  const handleDelete = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };
  return (
    <div className="dash-submissions">
      <div className="dash-cartitem">
        {cartItems.map((item) => (
          <div key={item.id} className="grid-item-dash">
            <CartProduct prodObj={item} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      <div>
        <button
          className="btn-submit"
          id="clear-all"
          onClick={() => setCartItems([])}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default DashSubmissions;
