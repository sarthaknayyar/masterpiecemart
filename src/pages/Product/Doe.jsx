import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../ProductPage.css";
// i want to import cart_prod from cart.js that is inside services folder in src folder
import { cart_prod } from "../../services/cart";
import Navbar from "../../components/Navbar";

function ProductPage(props) {
  const [cartStatus, setCartStatus] = useState("Add To Cart");
  const [wishlistStatus, setWishlistStatus] = useState("Add to wishlist");
  const [fontColor, setFontColor] = useState("green-400");
  
  const showToastMessage = () => {
    toast.success('Item added to cart');
  };

  const wishlistToastMessage = () => {  
    toast.success('Item added to wishlist');
  };

  // make a js list that will store a random prod_id , product name , artist name , price
  const prod_list = {
    price: props.price,
    artistId: props.artistId,
    productImage:props.productImage,
    artistName: props.artistName,
    productName: props.productName,
    productId: props.productId
  };  


  useEffect(() => {
    
    const productId = prod_list.productId; 
    fetch(`http://localhost:8080/api/products/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.productId===productId) {
          document.querySelector(".addcart").classList.add("in-cart");
        } 
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []); 

  const addToCart = (element) => {
    if (!element.classList.contains("in-cart")) {
      element.classList.add("in-cart");
      setCartStatus("In Your Cart");
      showToastMessage();
      cart_prod(prod_list);
      
  };
  
};

  const addToWishlist = (element) => {
    if (!element.classList.contains("added")) {
      element.classList.add("added");
      setWishlistStatus("In Your Wishlist");
      wishlistToastMessage();
      element.style.color = "red";
    }
  };
  return (
    <>
      {/* <header> */}
      <Navbar />
      {/* </header> */}
      <div className="product-mains ">
        <div className="product-image" 
        >
          <div 
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
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
            <div class="carousel-inner prod-img">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src="//www.ugallery.com/cdn/shop/files/orig_javier-ortas-watercolor-painting-a-doe_312x.jpg?v=1713506923"
                  alt="First slide"
                />
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="//www.ugallery.com/cdn/shop/files/orig_javier-ortas-watercolor-painting-a-doe_312x.jpg?v=1713506923"
                  alt="Second slide"
                />
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="https://www.ugallery.com/cdn/shop/files/orig_javier-ortas-watercolor-painting-a-doe-detail-2_540x.jpg?v=1713506923"
                  alt="Third slide"
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="product-text">
          <div className="product-title">
            <h2>Starry Night Over The Rhone</h2>
          </div>
          <div className="by">
            <h2>By</h2>
          </div>
          <div className="artist-name"> Vincent Van Gogh</div>
          <div className="product-info">
            <div className="info-box-column mt-2">
              <div className="infobox">
                {" "}
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
            <div className="product-price">$299</div>
            <div className="product-shipment">No Shipping Charges</div>
            <div className="buyandcart flex flex-col justify-center">
              <div className="flex">
                <div className="buyNow">
                  <button className="buy">Buy Now</button>
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
          Starry Night Over the Rhône, is one of Vincent van Gogh's paintings of
          Arles at night. It was painted on the bank of the Rhône that was only
          a one or two-minute walk from the Yellow House on the Place Lamartine,
          which van Gogh was renting at the time. The night sky and the effects
          of light at night provided the subject for some of van Gogh's more
          famous paintings, including Café Terrace at Night (painted earlier the
          same month) and the June, 1889, canvas from Saint-Remy, The Starry
          Night.
        </div>
      </div>
      <div className="join">
        <div className="join-us-on">JOIN US ON</div>
        <div className="social">
          <div className="youtube">
            <a href="https://www.youtube.com/@muskanart3102">
              <i className="fa-brands fa-youtube"></i>
              <br />
              Youtube
              <br />
              Muskan Art
            </a>
          </div>
          <div className="insta">
            <a href="https://www.instagram.com/muskan_arts_0/?hl=en">
              <i className="fa-brands fa-instagram"></i>
              <br />
              Instagram
              <br />
              Muskan Art
            </a>
          </div>
          <div className="telegram">
            <a href="#">
              <i className="fa-brands fa-telegram"></i>
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
            <a href="#">Blog</a>
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
      </footer>
    </>
  );
  
}

export default ProductPage;
