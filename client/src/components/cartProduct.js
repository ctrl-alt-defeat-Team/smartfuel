import React, {useState, useEffect} from "react";

import "../styles/Cart.css";
import { StarFill, Trash } from "react-bootstrap-icons";
import SearchProduct from '../functions/searchProduct';


const CartProduct = ({ product, onDelete, idProduct, quantity }) => {
  const [loading, setLoading] = useState(true);
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const handleChangeQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    setSelectedQuantity(newQuantity);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex((item) => item.startsWith(idProduct));
    if (productIndex !== -1) {
      const updatedProduct = `${idProduct}${newQuantity}`;
      existingCart[productIndex] = updatedProduct;
      console.log("updatedProduct:", updatedProduct);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
  };

    useEffect(() => {
      console.log("idProduct:", idProduct);
      console.log("product:", product);
      if(idProduct !== null) {
        console.log("idProduct changed:", idProduct);
      const fetchData = async () => {
        try {
          const productData = await SearchProduct('barcode', idProduct);
          console.log(productData);
          console.log('productData:', productData);
          setLoadedProduct(productData);
          setLoading(false);
        } catch (error) {
          console.error('Error in fetchData:', error);
        }
      };
      if (product === null || product === undefined) {
        fetchData();
      } else {
        setLoading(false);
      }
    }
    else {
      setLoading(false);
    }
  }, [idProduct,product]);

    const handleDelete = () => {
      onDelete(currentProduct._id); 
    };

    const currentProduct = loadedProduct || product;

    if(currentProduct === null || currentProduct === undefined) {
      return <div>Loading...</div>;
    }

  return (
    <div className="cart-product">
      <div className="btn-remove-div">
        <button className="btn-remove" onClick={handleDelete}>
          <Trash />
        </button>
      </div>
      <img src={currentProduct.image_front_url} alt="product" />
      <div className="product-info">
        <h3>{currentProduct.product_name}</h3>
        <div className="rating-details">
          <p>
            {currentProduct.rating}{" "}
            <span className="star">
              <StarFill />
            </span>
          </p>

          <select value={selectedQuantity} onChange={handleChangeQuantity}>
              {[...Array(9).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>

          <button className="btn-details">Details</button>
        </div>
      </div>
    </div>);
    }

export default CartProduct;
