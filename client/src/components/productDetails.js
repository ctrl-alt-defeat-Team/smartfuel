import React from "react";
import "../styles/productDetails.css";
import { HandThumbsUpFill } from "react-bootstrap-icons";
import "../styles/Mobile.css";

function ProductDetails({ product, setSelectedProduct }) {
  const handleClosePD = () => {
    setSelectedProduct(null);
  };

  const allergens = product.allergens_tags
    ? product.allergens_tags.map((tag) => tag.split(":")[1])
    : [];
  const allergen = allergens.join(", ");

  return (
    <div className="product-details-container">
      <div className="flex-details">
        <div className="left-col">
          <h2>{product.product_name}</h2>
          <p>{product.brands}</p>
          <img src={product.image_front_small_url} alt={product.product_name} />
        </div>

        <div className="product-details">
          <table>
            <thead>
              <tr>
                <th>Nutrient</th>
                <th id="top-right-th">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Energy</td>
                <td>{product.nutriments.energy}</td>
              </tr>
              <tr>
                <td>Fat</td>
                <td>{product.nutriments.fat}</td>
              </tr>
              <tr>
                <td>Carbohydrates</td>
                <td>{product.nutriments.carbohydrates}</td>
              </tr>
              <tr>
                <td>Sugars</td>
                <td>{product.nutriments.sugars}</td>
              </tr>
              <tr>
                <td>Fiber</td>
                <td>{product.nutriments.fiber}</td>
              </tr>
              <tr>
                <td>Proteins</td>
                <td>{product.nutriments.proteins}</td>
              </tr>
              <tr>
                <td>Salt</td>
                <td>{product.nutriments.salt}</td>
              </tr>
            </tbody>
          </table>

          <div className="nutriscore-likes">
            <p>
              Nutriscore: <span id="score">{product.nutriscore_grade}</span>{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="ingredients">
        <h3>Ingredients</h3>

        <p>{product.ingredients_text || "Ingredients are not known"}</p>
      </div>
      <div className="allergens">
        <h3>Allergens</h3>

        <p>{allergen || "No allergens"}</p>
      </div>
      <div className="btn-back">
        <button onClick={handleClosePD}>Back</button>
      </div>
      <div className="umplutura1">
        <p></p>
      </div>
    </div>
  );
}

export default ProductDetails;
