import React from "react";
import CartProduct from "./cartProduct";
import "../styles/Dashboard.css";
import { useState } from "react";
import { useEffect } from "react";

function DashSubmissions() {
  const [submitedItems, setSubmitedItems] = useState([]);

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
  };

  return (
    <div className="dash-submissions">
      <div className="dash-cartitem">
        {submitedItems.map((item) => (
          <div key={item.id} className="grid-item-dash">
            <CartProduct prodObj={item} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      <div>
        <button
          className="btn-submit"
          id="clear-all"
          onClick={() => setSubmitedItems([])}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default DashSubmissions;
