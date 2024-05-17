import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'
import Footer from "../components/Footer";


function Cart() {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

//   const flag=0;

  useEffect(() => {
    fetch("http://localhost:8080/api/wishlist")
      .then((response) => {
        if (!response.ok && response.status !== 404) {
          throw new Error(
            `Network response was not ok - ${response.status} ${response.statusText}`
          );
        }
        if(response.status === 404){
            return [];
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data.map((product) => ({ ...product, quantity: 1 })));
        } 
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  
  
  const deleteProductIfQuantityZero = async (productId) => {

    const productToDelete = products.find((product) => product.productId === productId);
  
    // Check if the product's quantity is zero
    // if (productToDelete) {
      try {
        // Make an API call to delete the product from the database
        const response = await fetch(`http://localhost:8080/api/wishlist/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete the product');
        }
  
        // Update the products state by filtering out the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productId)
        );
      } catch (error) {
        console.error(error);
      }
    // }
  };
  

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (

    <>
    {products.length ===0 ?  (
        <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-3xl font-bold">
            No Items In Your Wishlist!       
        </div>
        </>
    ) :(<>
    
        <Navbar />
    <div
      style={{
        transform: "scale(0.58)",
        transformOrigin: "0 0",
        width: "167%",
        height: "167%",
      }}
    >
      <div className="flex mt-6 mb-20 text-4xl font-bold justify-center">
        Your Wishlist!
      </div>
      <div className="flex  justify-around ">
      <div className="flex flex-col  ">
      {/* <div className="border-2 border-gray-500 w-full mt-10" /> */}
      {products.map((product) => (
        <div className="flex flex-col ">
            <div className="flex justify-between  bg-gray-100 border-2 border-gray-300 p-4 shadow-xl rounded-xl text-black " key={product.productId}>
          <div className="flex flex-col justify-around h-60 ml-10">
            <div className="flex justify-center px-1 mt-8 text-2xl font-bold">ITEM</div>
            <Link to={`/${product.productName}`} className="flex gap-36 text-xl justify-between items-center mt-4 text-current hover:text-current hover:no-underline">
              <div className="w-60 border-2 border-black">
              <img className='h-40 w-60'  src={`http://localhost:8080/api/allproducts/image0/${product.productName}`} alt="img" />
              </div>
              <div className="flex-col leading-10">
                <div className="flex justify-center text-3xl font-semi-bold italic w-80 leading-10">
                  {product.productName}
                </div>
                <div className="flex justify-center text-2xl">By</div>
                <div className="flex justify-center text-3xl italic">
                  {product.artistName}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-around items-center mx-12 mb-4">
            <div className="flex justify-center  text-2xl font-bold mb-6">
              PRICE
            </div>
            <div className="flex text-3xl ">
                Rs. {product.price}
              </div>
          </div>

          <div className="flex flex-col justify-around items-center mx-12 mb-4">
            <div className="flex justify-center px-1 mt-2  text-2xl font-bold mb-10">
              REMOVE
            </div>
            <div className="flex text-xl justify-between items-center ">
              <div className="flex justify-center items-center w-48 text-2xl">
                <div onClick={()=>deleteProductIfQuantityZero(product.productId)} className="flex justify-center items-center w-12 h-10 border-2 border-gray-900 text-2xl font-bold">
                  <button className="text-3xl font-bold" >-</button>
                </div>
                {/* <div className="flex flex-col ml-2 font-bold">
                  <div onClick={() => handleQuantityChange(product.productId)}>
                    <ArrowDropUpIcon />
                  </div>
                  <div onClick={() => handleQuantityChangeDec(product.productId)}>
                    <ArrowDropDownIcon />
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col justify-around items-center mx-12">
            <div className="flex justify-center px-1  text-xl font-bold">
              SUBTOTAL
            </div>
            <div className="flex text-xl justify-between items-center ">
              <div className="flex justify-center w-48 text-2xl">
                Rs. {product.price * product.quantity}
              </div>
            </div>
          </div> */}

          {/* <hr className="border-2 border-black w-full" /> */}
        </div>
        {/* <div className="border-2 border-gray-500 w-full mt-10" /> */}
        </div>
        
      ))}

      </div>
      {/* <div className="flex flex-col w-1/3 p-4 justify-between bg-gray-100 border-2 border-gray-300 shadow-xl rounded-xl h-100">
        <div className="flex justify-center items-center text-3xl font-semibold ">ORDER SUMMARY</div>
        <div className="flex justify-around items-center">
        <div class="flex flex-col text-2xl font-bold items-start justify-around h-96">
  <div>TOTAL ITEMS</div>
  <div>PRICE</div>
            <div>DELIVERY CHARGES</div>
            <div>SUBTOTAL</div>
</div>


            <div className="flex flex-col text-2xl justify-around h-96">
                <div>
                    {products.reduce((acc, product) => acc + product.quantity, 0)}

                </div>
                <div>
                    Rs. {products.reduce((acc, product) => acc + product.price * product.quantity, 0)}

                </div>
                <div>
                    Rs. 0
                </div>
                <div>
                    Rs. {products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
                </div>
            </div>
        </div>
        <div></div>
      </div>   */}
      </div>
      
    <Footer />
    </div>
    </>
    )}
    </>
    
        
        
    
  );
}

export default Cart;
