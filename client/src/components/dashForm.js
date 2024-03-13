import React from "react";
import "../styles/Dashboard.css";

function DashForm() {
  return (
    <div className="form-dash-container">
      <h3>Product submission form</h3>
      <form className="form-dash">
        <div className="form-group-large">
          <div className="form-group-d fg1">
            <input
              type="text"
              id="prod-name"
              name="product_name"
              required
              placeholder="Product name"
            />
            <input
              type="text"
              id="prod-barcode"
              name="barcode"
              required
              placeholder="Barcode"
            />
            <input
              type="text"
              id="prod-brands"
              name="brands"
              required
              placeholder="Brands (separated by commas)"
            />
            <input
              type="file"
              id="prod-image"
              name="image_front_small_url"
              required
              placeholder="Image URL"
            />
          </div>
          <div className="form-group-d">
            <input
              type="text"
              id="prod-energy"
              name="energy"
              required
              placeholder="Energy (cal)"
            />
            <input
              type="text"
              id="prod-fat"
              name="fat"
              required
              placeholder="Fats (g)"
            />
            <input
              type="text"
              id="prod-carbohydrates"
              name="carbohydrates"
              required
              placeholder="Carbohydrates (g)"
            />
            <input
              type="text"
              id="prod-sugars"
              name="sugars"
              required
              placeholder="Sugars (g)"
            />
          </div>
          <div className="form-group-d">
            <input
              type="text"
              id="prod-fiber"
              name="fiber"
              required
              placeholder="Fiber (g)"
            />
            <input
              type="text"
              id="prod-proteins"
              name="proteins"
              required
              placeholder="Proteins (g)"
            />
            <input
              type="text"
              id="prod-salt"
              name="salt"
              required
              placeholder="Salt (g)"
            />
            <input
              type="text"
              id="prod-nutriscore"
              name="nutriscore_grade"
              required
              placeholder="Nutriscore grade (a, b, c, d, e)"
            />
          </div>
        </div>
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
