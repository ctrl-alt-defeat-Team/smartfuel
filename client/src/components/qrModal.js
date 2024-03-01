// QRModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Scanner from "./Scanner";
import "../styles/Modal.css"; 
import "../styles/qrModal.css"; 
import ScannedProduct from "./scannedProduct";
import searchProduct from "../functions/searchProduct";
function QRModal({ showModal, closeModal }) { 

  const [result, setResult] = useState(null);
  const [product, setProduct] = useState(null);

  const onDetected = async (cameraResult) => {
    if(result == null){
      try {
        setResult(cameraResult);
        const productData = await searchProduct(cameraResult);
        setProduct(productData);
      }catch (error) {
        console.error('Error in onDetected:', error);
      }
    };
  };
  
  
    return (
    <Modal className="QRModal" show={showModal} onHide={closeModal} centered>
      <Modal.Header >
        <Modal.Title className="textQr" >QR Code Scan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p className="textQr">{result ? result : "Scanning..."}</p>
      <div className="container">
        {(result == null) && <Scanner onDetected={onDetected} />}
        {(product != null) && <ScannedProduct product={product}/>}
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
  };

export default QRModal;
