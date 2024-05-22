import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../ProductPage.css";
import { cart_prod } from "../../services/cart";
import Navbar from "../../components/Navbar";
import { wishlist_prod } from "../../services/wishlist";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Footer from "../../components/Footer";


function ProductPage(props) {
  const [cartStatus, setCartStatus] = useState("Add To Cart");
  const [wishlistStatus, setWishlistStatus] = useState("Add to wishlist");
  const [fontColor, setFontColor] = useState("green-400");
  const navigate = useNavigate();

  useEffect(() => {
    const productId = props.productId;
    console.log(productId);

    fetch(`http://localhost:8080/api/products/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (productId === data.productId) {
          document.querySelector(".addcart").classList.add("in-cart");
          setCartStatus("In Your Cart");
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });

    fetch(`http://localhost:8080/api/wishlist/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (productId === data.productId) {
          document.querySelector(".addToWishlistButton").classList.add("added");
          setWishlistStatus("In Your Wishlist");
          document.querySelector(".addToWishlistButton").style.color = "red";
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, [props.productId]);

  const showToastMessage = () => {
    toast.success('Item added to cart');
  };

  const wishlistToastMessage = () => {
    toast.success('Item added to wishlist');
  };

  const prod_list = {
    price: props.price,
    artistId: props.artistId,
    productImage: props.productImage,
    artistName: props.artistName,
    productName: props.productName,
    productId: props.productId,
    quantity: 1
  };

  const addToCart = (element) => {
    if (!element.classList.contains("in-cart")) {
      element.classList.add("in-cart");
      setCartStatus("In Your Cart");
      showToastMessage();
      cart_prod(prod_list);
    }
  };

  const addToWishlist = (element) => {
    if (!element.classList.contains("added")) {
      element.classList.add("added");
      setWishlistStatus("In Your Wishlist");
      wishlistToastMessage();
      element.style.color = "red";
      wishlist_prod(prod_list);
    }
  };

  const handleBuyNow = () => {
    navigate('/Checkout2', { state: prod_list });
  };

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div
          style={{
            transform: "scale(0.7)",
            transformOrigin: "0 0",
            width: "150%",
            height: "150%",
          }}
          className="product-mains flex"
        >
          <div className="product-image w-1/2 flex justify-center items-center h-fit overflow-hidden">
            <div
              id="carouselExampleIndicators"
              className="carousel slide flex"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner prod-img  ">
                <div className="carousel-item active">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:8080/api/allproducts/image0/${props.productName}`}
                    alt="img"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:8080/api/allproducts/image1/${props.productName + '1'}`}
                    alt="img"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:8080/api/allproducts/image2/${props.productName + '2'}`}
                    alt="img"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon text-black"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="product-text">
            <div className="product-title">
              <h1>{props.productName}</h1>
            </div>
            <div className="by">
              <h2>By</h2>
            </div>
            <div className="artist-name">{props.artistName}</div>
            <div className="product-info">
              <div className="info-box-column mt-2">
                <div className="infobox">
                  Acrylic painting on streched canvas
                </div>
                <div className="item-edge">Wrapped around edges</div>
                <div className="item-varnished">Varnished and Ready to Hang</div>
              </div>
              <div className="infobox-column">
                <div className="item-signature">signed on front and back</div>
                <div className="one-of-a-kind">One-Of-A-Kind!</div>
                <div className="item-year">2023</div>
              </div>
              <div className="product-size">20"h X 20"w</div>
              <div className="product-price font-bold m-2">Rs. {props.price}</div>
              <div className="product-shipment">No Shipping Charges</div>
              <div className="buyandcart flex flex-col justify-center">
                <div className="flex">
                  <div className="buyNow">
                    <button className="buy" onClick={handleBuyNow}>Buy Now</button>
                  </div>
                  <div className="addtocart">
                    <button
                      className="addcart"
                      onClick={() => addToCart(document.querySelector(".addcart"))}
                    >
                      {cartStatus}
                    </button>
                  </div>
                </div>
                <div
                  className="font-bold text-xl mt-10 addToWishlistButton"
                  onClick={() => addToWishlist(document.querySelector(".addToWishlistButton"))}
                  style={{ color: fontColor }}
                >
                  {wishlistStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-description">
        <div className="desc-title">
          <h2 className="u-heading u-heading--4">About this artwork</h2>
        </div>
        <div className="desc-text">
          {props.productDescription}
        </div>
      </div>
          <Footer />

        
      
    </div>
  </>
  );
}

export default ProductPage;
