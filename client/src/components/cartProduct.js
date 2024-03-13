import React, {useState, useEffect} from "react";

import "../styles/Cart.css";
import { StarFill, Trash } from "react-bootstrap-icons";
import SearchProduct from '../functions/searchProduct';


const CartProduct = ({ product, onDelete, idProduct }) => {
  const [loading, setLoading] = useState(true);
  const [loadedProduct, setLoadedProduct] = useState(null);
  
    useEffect(() => {
      if(idProduct !== null) {
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
      if (product === null) {
        fetchData();
      } else {
        setLoading(false);
      }
    }
    else {
      setLoading(false);
    }
  }, []);

    const handleDelete = () => {
      onDelete(product._id); 
    };
    if (loading) {
      return <div>Loading...</div>;
    }
    
    const currentProduct = product || loadedProduct;
  
  return (
    
    <div className="cart-product">
      <div className="btn-remove-div">
        <button className="btn-remove" onClick={handleDelete}>
          <Trash />
        </button>
      </div>
      <img src={currentProduct.image} alt="product" />
      <div className="product-info">
        <h3>{currentProduct.name}</h3>
        <div className="rating-details">
          <p>
            {currentProduct.rating}{" "}
            <span className="star">
              <StarFill />
            </span>
          </p>
          <button className="btn-details">Details</button>
        </div>
      </div>
    </div>);
    }

export default CartProduct;
