import React from "react";
import { useState, useEffect } from "react";
import SearchProduct from "../functions/searchProduct";
import calcCartNutrition from "../functions/calcCartNutrition";
import necessaryNutrition from "../functions/calcOptimalNutrtion";
import "../styles/cartDetails.css";

var totalNutrition = {
  energy: 0,
  fat: 0,
  carbohydrates: 0,
  sugars: 0,
  fiber: 0,
  proteins: 0,
};

function CartDetails({ cartItems, requiredNutrition, user }) {
  const [cartNutrition, setCartNutrition] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);

  const necessaryNutriments = necessaryNutrition(
    user.weight,
    user.height,
    user.male
  );
  console.log("necessaryNutriments:", necessaryNutriments);

  useEffect(() => {
    //  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    let v = [];
    let quantity = [];
    const fetchData = async (item) => {
      try {
        const productData = await SearchProduct("barcode", item);
        //   console.log("Product Dataaa", productData);
        v.push(productData);
        quantity.push(item.slice(-1));
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };
    cartItems.map((item) => {
      fetchData(item.slice(0, -1));
    });
    setCartNutrition(v);
    setCartQuantity(quantity);
  }, [cartItems]);

  useEffect(() => {
    cartNutrition.map((item, index) => {
      console.log("item:", item);
      if (parseInt(item.nutriments.energy) !== NaN) {
        totalNutrition.energy +=
          parseInt(item.nutriments.energy) * cartQuantity[index];
      } else {
        totalNutrition.energy +=
          parseFloat(item.nutriments.energy) * cartQuantity[index];
      }
      if (parseInt(item.nutriments.fat) !== NaN) {
        totalNutrition.fat +=
          parseInt(item.nutriments.fat) * cartQuantity[index];
      } else {
        totalNutrition.fat +=
          parseFloat(item.nutriments.fat) * cartQuantity[index];
      }
      if (parseInt(item.nutriments.carbohydrates) !== NaN) {
        totalNutrition.carbohydrates +=
          parseInt(item.nutriments.carbohydrates) * cartQuantity[index];
      } else {
        totalNutrition.carbohydrates +=
          parseFloat(item.nutriments.carbohydrates) * cartQuantity[index];
      }
      if (parseInt(item.nutriments.sugars) !== NaN) {
        totalNutrition.sugars +=
          parseInt(item.nutriments.sugars) * cartQuantity[index];
      } else {
        totalNutrition.sugars +=
          parseFloat(item.nutriments.sugars) * cartQuantity[index];
      }
      if (parseInt(item.nutriments.fiber) !== NaN) {
        totalNutrition.fiber +=
          parseInt(item.nutriments.fiber) * cartQuantity[index];
      } else {
        totalNutrition.fiber +=
          parseFloat(item.nutriments.fiber) * cartQuantity[index];
      }
      if (parseInt(item.nutriments.proteins) !== NaN) {
        totalNutrition.proteins +=
          parseInt(item.nutriments.proteins) * cartQuantity[index];
      } else {
        totalNutrition.proteins +=
          parseFloat(item.nutriments.proteins) * cartQuantity[index];
      }
    });
    console.log("totalNutrition:", totalNutrition);
  }, [cartNutrition]);

  console.log("cartNutrition:", totalNutrition);
  return (
    <>
      <h2>Cart Details</h2>
      <div className="nutriments-cart">
        <div className="nutriments-left">
          <h4>Total energy:</h4>
          <p>
            {totalNutrition.energy} kJ /{" "}
            <span className="colored-span">
              {" "}
              {necessaryNutriments.calories}{" "}
            </span>{" "}
            kj
          </p>
          <h4>Total fat:</h4>
          <p>
            {totalNutrition.fat} g /{" "}
            <span className="colored-span">{necessaryNutriments.fats}</span> g
          </p>
          <h4>Total carbohydrates:</h4>
          <p>
            {totalNutrition.carbohydrates} g /{" "}
            <span className="colored-span"> {necessaryNutriments.carbs}</span> g
          </p>
        </div>
        <div className="nutriments-left">
          <h4>Total sugars:</h4>
          <p>{totalNutrition.sugars} g </p>
          <h4>Total fiber:</h4>
          <p>
            {totalNutrition.fiber} g /{" "}
            <span className="colored-span"> {necessaryNutriments.fats}</span> g
          </p>
          <h4>Total proteins:</h4>
          <p>
            {totalNutrition.proteins} g /{" "}
            <span className="colored-span"> {necessaryNutriments.fats}</span> g
          </p>
        </div>
      </div>
    </>
  );
}

export default CartDetails;
