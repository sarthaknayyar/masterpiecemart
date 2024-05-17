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
      <div className="">
        <Navbar />
        <div
          style={{
            transform: "scale(0.80)",
            transformOrigin: "0 0",
            width: "125%",
            height: "125%",
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
              <div className="carousel-inner prod-img h-96 overflow-hidden">
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
              <div className="product-price">${props.price}</div>
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

        <div className="flex justify-around">
          <div className="flex flex-col m-8 justify-center">
            <h2 className="u-heading u-heading--4">About this artwork</h2>
          </div>
          <div className="flex m-8 w-1/2 text-xl leading-8">
            {props.productDescription}
          </div>
        </div>
        <div className="join">
          <div className="join-us-on">JOIN US ON</div>
          <div className="social">
            <div className="youtube">
              <a href="https://www.youtube.com/@muskanart3102">
              {/* <div> */}
      <FontAwesomeIcon icon={faYoutube} className="text-2xl" style={{color:'red'}} />
    {/* </div> */}
                <br />
                Youtube
                <br />
                Muskan Art
              </a>
            </div>
            <div className="insta">
              <a href="https://www.instagram.com/muskan_arts_0/?hl=en">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                <br />
                Instagram
                <br />
                Muskan Art
              </a>
            </div>
            <div className="telegram">
              <a href="#">
                <FontAwesomeIcon icon={faTelegram} className="text-2xl" style={{color:'blue'}}/>
                <br />
                Telegram
                <br />
                Muskan Art
              </a>
            </div>
          </div>
        </div>
        <div className="invitation">
          <div className="invite-main">You're invited</div>
          <div className="invite-message">
            "Stay up-to-date with monthly new art releases,
            <br />
            insightful artist profiles, and exclusive collections"
          </div>
          <div className="provide-mail">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="mail-input"
            />
            <button className="submitbtn" type="submit">
              Submit
            </button>
          </div>
        </div>
        <footer>
          <div className="footbar">
            <div className="description">
              <div className="foot-logo">
                <a href="Index.html">MasterPiece Mart</a>
              </div>
              <div className="desc">
                Masterpiece Mart is an online art gallery with a curated selection
                of original art for sale. Shop thousands of oil paintings,
                acrylics, watercolor paintings, mixed media art, and more. Contact
                us for a free art advisor consultation, and we’ll be happy to help
                you find your ideal artwork.
              </div>
            </div>
            <div className="links">
              <a href="#">F&A</a>
              <a href="#">Contact Us</a>
              <a href="#">Returns</a>
              <a href="#">About Us</a>
              <Link to="/Blog">Blog</Link>
              <a href="#">Team Wizard</a>
            </div>
          </div>
          <div className="end">
            <div className="end-content">
              PHONE
              <br />
              8825******
            </div>
            <div className="end-content">
              EMAIL
              <br />
              teamwizard@pvt.ltd.in
            </div>
            <div className="end-content">
              SOCIAL MEDIA
              <br />
              <a href="https://www.instagram.com/muskan_arts_0/?hl=en">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <br />
              <a href="#">
                <i className="fa-brands fa-telegram"></i>
              </a>
              <br />
              <a href="https://www.youtube.com/@muskanart3102">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            <div className="end-content">
              <a href="#">TERMS</a>
              <br />
              <a href="#">PRIVACY</a>
            </div>
            <div className="end-content">Copyright &#169; 2023</div>
          </div>
        {/* </div> */}
      </footer>
    </div>
  </>
  );
}

export default ProductPage;
