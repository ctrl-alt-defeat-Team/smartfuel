import React from "react";
import CartProduct from "./cartProduct";
import "../styles/Dashboard.css";
import { useState } from "react";
import { useEffect } from "react";
import ProductDetails from "./productDetails";

function DashApproved() {
  const [approvedItems, setApprovedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDetailsClick = (index) => {
    setSelectedProduct(approvedItems[index]);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
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
      setApprovedItems(
        approvedItems.filter((item) => item.barcode !== product.barcode)
      );
      console.log("Fetched barcode", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/addProduct/existing/getapproved`,
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
        setApprovedItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (productId) => {
    setApprovedItems(approvedItems.filter((item) => item.id !== productId));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="dash-submissions">
      <div className="dash-cartitem">
        {approvedItems.map((item, index) => (
          <div key={item.id} className="grid-item-dash">
            <CartProduct
              product={item}
              onDelete={handleDelete}
              onDetailsClick={() => handleDetailsClick(index)}
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
            setApprovedItems([]);
            setSelectedProduct(null);
          }}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default DashApproved;
