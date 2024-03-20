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
import ProductDetails from "./productDetails";
import DashForm from "./dashForm";

function QRModal({ showModal, closeModal, name }) {
  const [result, setResult] = useState(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDetailsClick = (index) => {
    setSelectedProduct(products[index]);
  };

  const handleDetailsClick2 = () => {
    setSelectedProduct(product);
  };
  
  const openForm = () => {
    setShowForm(true);
  };

  const handleAddToCart = (index,quantity) => {
    if(index === -1){
      const existingCart = localStorage.getItem("cart");
      console.log("existingCart:", existingCart);
      if (existingCart !== null && existingCart !== undefined && existingCart !== "") {
        let data = JSON.parse(existingCart);
  
        localStorage.setItem("cart", JSON.stringify([...data, product._id+quantity]));
      } else {
        localStorage.setItem("cart", JSON.stringify([product._id+quantity]));
      }
    }
    else{
      const existingCart = localStorage.getItem("cart");
      console.log("existingCart:", existingCart);
      if (existingCart !== null && existingCart !== undefined && existingCart !== "") {
        let data = JSON.parse(existingCart);

        localStorage.setItem("cart", JSON.stringify([...data, products[index]._id+quantity]));
      } else {
        localStorage.setItem("cart", JSON.stringify([products[index]._id+quantity]));
      }
    }
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (name !== null && product == null && products == null && name !="" ) {
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
          {result == null && (name == null || name =="")&& (
            <Scanner onDetected={onDetected} />
          )}
          {product != null && (
            <ScannedProduct
              product={product}
              onDetailsClick={handleDetailsClick2}
              handleAddToCart={handleAddToCart}
            />
          )}
          {products != null && !showForm && (
            <ScannedProductsList
              products={products}
              onDetailsClick={handleDetailsClick}
              handleAddToCart={handleAddToCart}
            />
          )}
          {selectedProduct != null && (
            <ProductDetails
              product={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              handleAddToCart={handleAddToCart}
            />
          )}
          {showForm && <DashForm closeModal={closeModal} />}
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-close-btn">
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="warning" onClick={openForm}>
          Add new product
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRModal;
