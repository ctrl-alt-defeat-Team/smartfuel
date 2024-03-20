import React from "react";
import CartProduct from "./cartProduct";
import "../styles/Dashboard.css";
import { useState } from "react";
import { useEffect } from "react";
import ProductDetails from "./productDetails";

function DashSubmissions() {
  const [submitedItems, setSubmitedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDetailsClick = (index) => {
    setSelectedProduct(submitedItems[index]);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/addProduct/existing`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched data", data);
        setSubmitedItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (productId) => {
    setSubmitedItems(submitedItems.filter((item) => item.id !== productId));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="dash-submissions">
      <div className="dash-cartitem">
        {submitedItems.map((item, index) => (
          <div key={item.id} className="grid-item-dash">
            <CartProduct
              product={item}
              onDelete={handleDelete}
              onDetailsClick={() => handleDetailsClick(index)}
            />
          </div>
        ))}
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        )}
      </div>
      <div>
        <button
          className="btn-submit"
          id="clear-all"
          onClick={() => {
            setSubmitedItems([]);
            setSelectedProduct(null);
          }}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default DashSubmissions;
