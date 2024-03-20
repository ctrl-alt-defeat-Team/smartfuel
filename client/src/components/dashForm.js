import React, { useState } from "react";
import "../styles/Dashboard.css";

function DashForm() {
  // State variables to store form data
  const [formData, setFormData] = useState({
    product_name: "",
    barcode: "",
    brands: "",
    image_front_url: "",
    nutriments: {
      energy: "",
      fat: "",
      carbohydrates: "",
      sugars: "",
      fiber: "",
      proteins: "",
      salt: "",
    },
    nutriscore_grade: ""
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("nutriments")) {
      const nutrimentsField = name.split(".")[1];
      setFormData(prevState => ({
        ...prevState,
        nutriments: {
          ...prevState.nutriments,
          [nutrimentsField]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-dash-container">
      <h3>Product submission form</h3>
      <form className="form-dash" onSubmit={handleSubmit}>
        {/* Form input fields */}
        {/* Product details */}
        <div className="form-group-large">
          <div className="form-group-d fg1">
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              required
              placeholder="Product name"
            />
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              required
              placeholder="Barcode"
            />
            <input
              type="text"
              name="brands"
              value={formData.brands}
              onChange={handleInputChange}
              required
              placeholder="Brands (separated by commas)"
            />
            <input
              type="text"
              name="image_front_url"
              value={formData.image_front_url}
              onChange={handleInputChange}
              required
              placeholder="Image URL"
            />
          </div>
          {/* Nutriments */}
          <div className="form-group-d">
            <input
              type="text"
              name="nutriments.energy"
              value={formData.nutriments.energy}
              onChange={handleInputChange}
              required
              placeholder="Energy (cal)"
            />
            <input
              type="text"
              name="nutriments.fat"
              value={formData.nutriments.fat}
              onChange={handleInputChange}
              required
              placeholder="Fats (g)"
            />
            <input
              type="text"
              name="nutriments.carbohydrates"
              value={formData.nutriments.carbohydrates}
              onChange={handleInputChange}
              required
              placeholder="Carbohydrates (g)"
            />
            <input
              type="text"
              name="nutriments.sugars"
              value={formData.nutriments.sugars}
              onChange={handleInputChange}
              required
              placeholder="Sugars (g)"
            />
          </div>
          <div className="form-group-d">
            <input
              type="text"
              name="nutriments.fiber"
              value={formData.nutriments.fiber}
              onChange={handleInputChange}
              required
              placeholder="Fiber (g)"
            />
            <input
              type="text"
              name="nutriments.proteins"
              value={formData.nutriments.proteins}
              onChange={handleInputChange}
              required
              placeholder="Proteins (g)"
            />
            <input
              type="text"
              name="nutriments.salt"
              value={formData.nutriments.salt}
              onChange={handleInputChange}
              required
              placeholder="Salt (g)"
            />
          {/* Nutriscore grade */}
          <input
            type="text"
            name="nutriscore_grade"
            value={formData.nutriscore_grade}
            onChange={handleInputChange}
            required
            placeholder="Nutriscore grade (a, b, c, d, e)"
          />
                    </div>

        </div>
        {/* Submit button */}
        <div className="btn-dash-div">
          <button type="submit" className="btn-submit btn-dash-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DashForm;
