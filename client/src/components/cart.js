import React, { useState, useEffect } from "react";
import "../styles/CartPage.css";
import CartProduct from "./cartProduct";
import Button from "react-bootstrap/Button";
import "../styles/Mobile.css";
import CartDetails from "./cartDetails";
import ProductDetails from "./productDetails";
import "../styles/productDetails.css";

function Cart({ setShowCart, cart, isAdmin, user }) {
  const closeButtonClick = () => {
    setShowCart(false);
  };

  const [cartItems, setCartItems] = useState([]);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const resetCart = () => {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  const displayProductDetails = async (barcode) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/search/barcode/${barcode}`
      );
      if (response.ok) {
        const product = await response.json();
        setSelectedProduct(product);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const displayDetails = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
      setShowCartDetails(true);
    }
    console.log("cartItems:", cartItems);
  };

  const finishShopping = async () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
    console.log("cartItems:", cartItems);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/saveCart/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, date: new Date() }),
      }
    );
    console.log(response);
    resetCart();
  };

  useEffect(() => {
    if (cart != null) {
      const barcodes = cart.products.map(
        (product) => product.barcode + product.quantity
      );
      console.log("cart:", barcodes);
      setCartItems(barcodes);
    } else {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        setCartItems(JSON.parse(cartData));
      }
    }
  }, []);
  const handleDelete = (productId) => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
    console.log("Deleting product with id:", productId);
    const updatedCartItems = cartItems.filter(
      (item) => item.slice(0, -1) !== productId
    );
    setCartItems(updatedCartItems);
    console.log("updatedCartItems:", updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  return (
    <div>
      <div className="cartpage">
        <div className="modal-title">
          <div id="close-div">
            <Button id="close" onClick={closeButtonClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </Button>
          </div>
          <div id="cart-title">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-basket basket"
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
              </svg>
            </h2>
            <div className="title-btns">
              {cart == null && (
                <Button id="Reset" onClick={resetCart}>
                  Reset Cart
                </Button>
              )}
              {cart == null && (
                <Button id="Fisish" onClick={finishShopping}>
                  Finish Shopping
                </Button>
              )}
              <Button id="Cart-details" onClick={displayDetails}>
                Cart Nutriments
              </Button>
            </div>
          </div>
        </div>
        {selectedProduct && (
          <div className="details-product-cart">
            <ProductDetails
              product={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              fromCart={true}
            />
          </div>
        )}
        {!selectedProduct && showCartDetails ? (
          <CartDetails cartItems={cartItems} user={user} />
        ) : (
          <div className="cartitem">
            {cartItems.map((item) => (
              <div key={item} className="grid-item">
                <CartProduct
                  idProduct={item.slice(0, -1)}
                  quantity={item.slice(-1)}
                  isAdmin={isAdmin}
                  showDelete={cart == null}
                  onDetailsClick={() =>
                    displayProductDetails(item.slice(0, -1))
                  }
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
