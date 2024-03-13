import React from "react";

function DashForm() {
  return (
    <div className="form-dash-container">
      <h3>Product submission form</h3>
      <form>
        <input type="text" id="prod-name" name="name" required />
        <input type="text" id="prod-barcode" name="barcode" required />
        <input type="text" id="prod-price" name="price" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DashForm;
