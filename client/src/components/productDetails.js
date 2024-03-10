import React from "react";
import "../styles/productDetails.css";
import { HandThumbsUpFill } from "react-bootstrap-icons";

const productDemo = {
  name: "Coca Cola",
  brand: "Coca Cola",
  image:
    "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_fr.224.200.jpg",
  nutriments: {
    energy: 180,
    fat: 0,
    carbohydrates: 10,
    sugars: 10,
    fiber: 0,
    proteins: 0,
    salt: 0.1,
  },
  nutriscore_grade: "E",
  user_likes: 230,
};

function ProductDetails({ product = productDemo }) {
  return (
    <div className="product-details-container">
      <div className="left-col">
        <h1>{product.name}</h1>
        <p>{product.brand}</p>
        <img src={product.image} alt={product.product_name} />
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
          <p>
            <span>{product.user_likes}</span>
            <HandThumbsUpFill className="like" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
