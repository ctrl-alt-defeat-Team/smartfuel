import React, { useState, useEffect } from "react";

import "../styles/Cart.css";
import { HeartFill,Heart, Trash } from "react-bootstrap-icons";
import SearchProduct from "../functions/searchProduct";

const CartProduct = ({
  product,
  onDelete,
  idProduct,
  quantity,
  isAdmin,
  onAccept,
  onReject,
  showApproved,
  showDelete,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [isLiked, setIsLiked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);
  const [likeHandle, setLikeHandle] = useState(false);
  const currentProduct = loadedProduct || product;


  const handleLike = async () => {
    const token = localStorage.getItem("token");
    console.log("currentProduct:", currentProduct);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/likeProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ barcode: idProduct }),
      }
    );
    setLikeHandle(!likeHandle);
  }


  const handleChangeQuantity = (event) => {
    const newQuantity = parseInt(event.target.value);
    setSelectedQuantity(newQuantity);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex((item) =>
      item.startsWith(idProduct)
    );
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
    if (idProduct !== null) {
      console.log("idProduct changed:", idProduct);
      const fetchData = async () => {
        try {
          const productData = await SearchProduct("barcode", idProduct);
          console.log(productData);
          console.log("productData:", productData);
          setLoadedProduct(productData);
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/getLikes/`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ barcode: idProduct}),
            }
          );
          const likes = await response.json();
          setIsLiked(likes.liked);
          setNoOfLikes(likes.likes);

        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      };
      if (product === null || product === undefined) {
        fetchData();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [idProduct, product, likeHandle]);

  const handleDelete = () => {
    onDelete(currentProduct._id);
  };


  if (currentProduct === null || currentProduct === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-product">
      <div className="btn-remove-div">
        {isAdmin && !showApproved && (
          <button className="accept-btn" onClick={() => onAccept(product)}>
            Accept
          </button>
        )}
        {isAdmin && (
          <button className="reject-btn" onClick={() => onReject(product)}>
            Reject
          </button>
        )}
        {(!isAdmin && showDelete) && (
          <button className="btn-remove" onClick={handleDelete}>
            <Trash />
          </button>
        )}
      </div>
      <img src={currentProduct.image_front_url} alt="product" />
      <div className="product-info">
        <h3>{currentProduct.product_name}</h3>
        <div className="rating-details">
          <p>
           <button onClick = {handleLike}> 
           {!isLiked &&  <span className="user-likes">
              <Heart color="red" />
              {noOfLikes}
            </span>
            }
            {isLiked &&  <span className="user-likes">
              <HeartFill color="red" />
              {noOfLikes}
              </span>
            }
            </button>
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
    </div>
  );
};

export default CartProduct;
