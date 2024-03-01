// QRModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Scanner from "./Scanner";
import "../styles/Modal.css"; 
import "../styles/qrModal.css"; 

import Quagga from 'quagga'; 


function QRModal({ showModal, closeModal }) { 

  const [camera, setCamera] = useState(true);
  const [result, setResult] = useState(null);

  const onDetected = result => {
    setResult(result);
  };
  
    return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header >
        <Modal.Title className="textQr" >QR Code Scan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p className="textQr">{result ? result : "Scanning..."}</p>
      <div className="container">
        {camera && <Scanner onDetected={onDetected} />}
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
