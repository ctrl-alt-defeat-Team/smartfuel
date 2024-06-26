import React, { useState } from "react";
import { QrCodeScan } from "react-bootstrap-icons";
import "../styles/landing.css";
import QRModal from "./qrModal";
import "../styles/Mobile.css";

function Landing({user}) {
  const [showModal, setShowModal] = useState(false);
  const [name, setProductName] = useState(null);

  const openModal = (event) => {
    event.preventDefault(); 
    setShowModal(true);

  };
  const closeModal = () => {

    setShowModal(false);
    setProductName("");
    console.log(name);
  };
  return (
    <div className="landing-container">
      <h1>SEARCH ITEM WITH SMARTFUEL</h1>
      <h2>Search or scan the barcode for product details</h2>
      <div className="form-cont">
        <form className="scan-form">
          <div className="box-qr">
            <button className="qr-btn" onClick={openModal}>
              <div className="box-qr">
                <QrCodeScan className="qr"  />
              </div>
            </button>
          </div>
        </form>
        {(showModal == true) && <QRModal showModal={showModal} closeModal={closeModal} name={name} user={user}/>}
        <form className="search-form">
          <input 
          type="text" 
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setProductName(e.target.value)}
          />
          <button className="search-btn" onClick={openModal}>
            <div className="box">
              <span className="search-bar">Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search lupa" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
