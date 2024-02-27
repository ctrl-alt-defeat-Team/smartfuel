import React from "react";
import { QrCodeScan } from "react-bootstrap-icons";
import "../styles/landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <h1>SEARCH ITEM WITH SMARTFUEL</h1>
      <h2>Search or scan the barcode for product details</h2>
      <div className="form-container">
        <form className="scan-form">
          <button className="qr-btn">
            <QrCodeScan className="qr" />
          </button>
        </form>
        <form className="search-form">
          <input type="text" placeholder="Enter product name" />
          <button className="search-btn">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
