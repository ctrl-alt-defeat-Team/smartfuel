import React, { useState } from 'react';
import "../styles/CartPage.css";
import CartProduct from "./cartProduct"; // Import CartProduct component
import Button from "react-bootstrap/Button";
import Landing from './landing';
import "../styles/landing.css";
import App from '../App';
import "../styles/App.css";

function Cart() {
    const [closeButton, setCloseButton] = useState(false);
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
    ]);

    const handleClose = () => {
        setCloseButton(true);
    };
    const handleDelete = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    return (
        <div className="screen-body">
            {closeButton ? (
                <App />
            ) : (
            <div className="cartpage">
                <div className="modal-title">
                    <div id="close-div">
                        <Button id="close" onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </Button>
                    </div>
                    <div id="cart-title">
                        <h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-basket basket" viewBox="0 0 16 16">
                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </h2>
                    </div>
                </div>
                <div className="cartitem">
                    {cartItems.map(item => (
                        <div key={item.id} className="grid-item">
                            <CartProduct prodObj={item} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    );
};

export default Cart;
