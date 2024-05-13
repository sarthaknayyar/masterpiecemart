import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Navbar from "../components/Navbar";

function Cart() {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok - ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data.map((product) => ({ ...product, quantity: 1 })));
        } else {
          throw new Error("No products found");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  function handleQuantityChange(productId) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  }
  function handleQuantityChangeDec(productId){
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, quantity: Math.max(product.quantity - 1,0) }
          : product
      )
    );
    if(products.filter((product) => product.productId === productId)[0].quantity === 0){
      setProducts((prevProducts) =>
      prevProducts.filter((product) =>
        product.productId !== productId
      ) 
    );
    deleteProductIfQuantityZero(productId);
}
  }
  const deleteProductIfQuantityZero = async (productId) => {
    // Find the product in the products array with the given productId
    const productToDelete = products.find((product) => product.productId === productId);
  
    // Check if the product's quantity is zero
    if (productToDelete && productToDelete.quantity === 0) {
      try {
        // Make an API call to delete the product from the database
        const response = await fetch(`/api/products/${productId}`, {
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
    }
  };
  

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
        <Navbar />
    <div
      style={{
        transform: "scale(0.67)",
        transformOrigin: "0 0",
        width: "150%",
        height: "150%",
      }}
    >
      <div className="flex mt-6 mb-20 text-3xl font-bold justify-center">
        Items in your cart!
      </div>
      <div className="flex  justify-around">
      <div className="flex flex-col ">
      {/* <div className="border-2 border-gray-500 w-full mt-10" /> */}
      {products.map((product) => (
        <div className="flex flex-col ">
            <div className="flex justify-between  bg-gray-100 border-2 border-gray-300 p-4 shadow-xl rounded-xl" key={product.productId}>
          <div className="flex flex-col justify-around h-60 ml-10">
            <div className="flex justify-center px-1 mt-8 text-xl font-bold">ITEM</div>
            <div className="flex gap-24 text-xl justify-between items-center mt-4">
              <div className="w-48 border-2 border-black">
                <img
                  className="border-2 border-black"
                  src={`${product.productImage}`}
                  alt=""
                />
              </div>
              <div className="flex-col">
                <div className="flex justify-center text-2xl font-semi-bold italic w-80">
                  {product.productName}
                </div>
                <div className="flex justify-center">By</div>
                <div className="flex justify-center text-2xl italic">
                  {product.artistName}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-around items-center mx-12">
            <div className="flex justify-center  text-xl font-bold">
              PRICE
            </div>
            <div className="flex text-2xl ">
                Rs. {product.price}
              </div>
          </div>

          <div className="flex flex-col justify-around items-center mx-12">
            <div className="flex justify-center px-1 mt-2  text-xl font-bold">
              QUANTITY
            </div>
            <div className="flex text-xl justify-between items-center ">
              <div className="flex justify-center items-center w-48 text-2xl">
                <div className="flex justify-center items-center w-8 h-8 border-2 border-gray-900">
                  {product.quantity}
                </div>
                <div className="flex flex-col ml-2 font-bold">
                  <div onClick={() => handleQuantityChange(product.productId)}>
                    <ArrowDropUpIcon />
                  </div>
                  <div onClick={() => handleQuantityChangeDec(product.productId)}>
                    <ArrowDropDownIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-around items-center mx-12">
            <div className="flex justify-center px-1  text-xl font-bold">
              SUBTOTAL
            </div>
            <div className="flex text-xl justify-between items-center ">
              <div className="flex justify-center w-48 text-2xl">
                Rs. {product.price * product.quantity}
              </div>
            </div>
          </div>

          {/* <hr className="border-2 border-black w-full" /> */}
        </div>
        {/* <div className="border-2 border-gray-500 w-full mt-10" /> */}
        </div>
        
      ))}

      </div>
      <div className="flex flex-col w-1/3 p-4 justify-between bg-gray-100 border-2 border-gray-300 shadow-xl rounded-xl h-100">
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
      </div>  
      </div>
      
    </div>
    </>
    
        
        
    
  );
}

export default Cart;
