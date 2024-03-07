// QRModal.js
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Scanner from "./Scanner";
import "../styles/Modal.css";
import "../styles/qrModal.css";
import ScannedProduct from "./scannedProduct";
import ScannedProductsList from "./scannedProductsList";
import searchProduct from "../functions/searchProduct";
function QRModal({ showModal, closeModal, name }) {
  const [result, setResult] = useState(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (name !== null && product == null && products == null) {
        try {
          const productsData = await searchProduct("name", name);
          console.log(productsData);
          setProducts(productsData);
        } catch (error) {
          console.error("Error in onDetected:", error);
        }
      }
    };
    if (name !== null && product == null && products == null) fetchData();
  }, [name]);

  const onDetected = async (cameraResult) => {
    if (result == null) {
      try {
        setResult(cameraResult);
        const productData = await searchProduct("barcode", cameraResult);
        setProduct(productData);
      } catch (error) {
        console.error("Error in onDetected:", error);
      }
    }
  };

  return (
    <Modal className="QRModal" show={showModal} onHide={closeModal} centered>
      <Modal.Header>
        <Modal.Title className="textQr">QR Code Scan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="textQr">{result ? result : "Scanning..."}</p>
        <div className="container">
          {result == null && name == null && (
            <Scanner onDetected={onDetected} />
          )}
          {product != null && <ScannedProduct product={product} />}
          {products != null && <ScannedProductsList products={products} />}
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-close-btn">
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRModal;
