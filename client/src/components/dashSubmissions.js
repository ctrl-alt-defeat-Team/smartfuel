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

  const handleAccept = async (product) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/approveProduct/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ barcode: product.barcode }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = response.json();
      setSubmitedItems(
        submitedItems.filter((item) => item.barcode !== product.barcode)
      );
      console.log("Fetched barcode", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReject = async (product) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/approveProduct/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ barcode: product.barcode }),
        }
      );
      if (!response.ok) {
        console.log("response:", response.body.barcode);
        throw new Error("Failed to fetch data");
      }
      const data = response.json();
      setSubmitedItems(
        submitedItems.filter((item) => item.barcode !== product.barcode)
      );
      console.log("Fetched barcode", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRejectAll = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/approveProduct/rejectall`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = response.json();
      console.log("Fetched barcode", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  return (
    <div className="dash-submissions">
      <div className="dash-cartitem">
        {submitedItems.map((item, index) => (
          <div key={item.id} className="grid-item-dash">
            <CartProduct
              product={item}
              onDetailsClick={() => handleDetailsClick(index)}
              onAccept={handleAccept}
              onReject={handleReject}
              isAdmin={true}
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
            handleRejectAll();
          }}
        >
          Reject all
        </button>
      </div>
    </div>
  );
}

export default DashSubmissions;
