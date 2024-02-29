// QRModal.js
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/Modal.css"; 
function QRModal({ showModal, closeModal }) {
  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>QR Code Scan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Your QR code scanning content goes here */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRModal;
