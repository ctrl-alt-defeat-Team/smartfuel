import React, { useState, useEffect } from "react";
import SearchProduct from "../functions/searchProduct";
import calcCartNutrition from "../functions/calcCartNutrition";
import necessaryNutrition from "../functions/calcOptimalNutrtion";
import "../styles/cartDetails.css";

function CartDetails({ cartItems, requiredNutrition, user }) {
  const [cartNutrition, setCartNutrition] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [cartAllergens, setCartAllergens] = useState([]);
  const [totalNutrition, setTotalNutrition] = useState({
    energy: 0,
    fat: 0,
    carbohydrates: 0,
    sugars: 0,
    fiber: 0,
    proteins: 0,
  });

  const necessaryNutriments = necessaryNutrition(
    user.weight,
    user.height,
    user.male
  );

  useEffect(() => {
    const fetchData = async () => {
      const v = [];
      const quantity = [];
      const allergens = [];

      await Promise.all(
        cartItems.map(async (item) => {
          try {
            const productData = await SearchProduct(
              "barcode",
              item.slice(0, -1)
            );
            v.push(productData);
            quantity.push(parseInt(item.slice(-1)));
            allergens.push(productData.allergens_from_ingredients);
          } catch (error) {
            console.error("Error in fetchData:", error);
          }
        })
      );

      setCartNutrition(v);
      setCartQuantity(quantity);
      setCartAllergens(allergens);
    };

    fetchData();
  }, [cartItems]);

  useEffect(() => {
    const newTotalNutrition = cartNutrition.reduce(
      (acc, item, index) => {
        return {
          energy: +(
            acc.energy +
            item.nutriments.energy * cartQuantity[index]
          ).toFixed(2),
          fat: +(acc.fat + item.nutriments.fat * cartQuantity[index]).toFixed(
            2
          ),
          carbohydrates: +(
            acc.carbohydrates +
            item.nutriments.carbohydrates * cartQuantity[index]
          ).toFixed(2),
          sugars: +(
            acc.sugars +
            item.nutriments.sugars * cartQuantity[index]
          ).toFixed(2),
          fiber: +(
            acc.fiber +
            item.nutriments.fiber * cartQuantity[index]
          ).toFixed(2),
          proteins: +(
            acc.proteins +
            item.nutriments.proteins * cartQuantity[index]
          ).toFixed(2),
        };
      },
      {
        energy: 0,
        fat: 0,
        carbohydrates: 0,
        sugars: 0,
        fiber: 0,
        proteins: 0,
      }
    );

    setTotalNutrition(newTotalNutrition);
  }, [cartNutrition, cartQuantity]);

  console.log("totalNutrition:", totalNutrition);

  return (
    <>
      <h2>Cart Nutriments</h2>
      <div className="nutriments-cart">
        <div className="nutriments-left">
          <h4>Total energy:</h4>
          <p>
            {totalNutrition.energy} kj /{" "}
            <span className="colored-span">{necessaryNutriments.calories}</span>{" "}
            kj
          </p>
          <h4>Total fat:</h4>
          <p>
            {totalNutrition.fat} g /{" "}
            <span className="colored-span">{necessaryNutriments.fats}</span> g
          </p>
        </div>
        <div className="nutriments-left">
          <h4>Total sugars:</h4>
          <p>{totalNutrition.sugars} g </p>
          <h4>Total fiber:</h4>
          <p>
            {totalNutrition.fiber} g /{" "}
            <span className="colored-span">{necessaryNutriments.fats}</span> g
          </p>
        </div>
        <div className="nutriments-left">
          <h4>Total proteins:</h4>
          <p>
            {totalNutrition.proteins} g /{" "}
            <span className="colored-span">{necessaryNutriments.fats}</span> g
          </p>
          <h4>Total carbohydrates:</h4>
          <p>
            {totalNutrition.carbohydrates} g /{" "}
            <span className="colored-span">{necessaryNutriments.carbs}</span> g
          </p>
        </div>
      </div>
      {/* <div className="allergens-cart">
        <h2>Allergens</h2>
        {cartAllergens.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div> */}
    </>
  );
}

export default CartDetails;
