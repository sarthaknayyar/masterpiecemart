import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


function Cart() {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [delStatus,setDelStatus] = useState(<span className="text-red-500">Free Delivery For Cart Value Above 1000</span>);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
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
        console.log(data);
        const total = data.reduce((acc, product) => acc + product.price * product.quantity, 0);
        if(total>1000){
          setDelStatus(<span className="text-green-500">Free Delivery Applied To This Order!</span>);
        }
        if (data && data.length > 0) {
          setProducts(data.map((product) => ({ ...product })));
        } 
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  },
  
  []);

  



  const handleQuantityChange = async (productId) => {
    // Find the product to update
    const updatedProduct = products.find((product) => product.productId === productId);
  
    // Increment the quantity for the found product
    const updatedProductWithIncrementedQuantity = { ...updatedProduct, quantity: updatedProduct.quantity + 1 };
    const total = products.reduce((acc, product) => {
      if (product.productId === productId) {
        return acc + product.price * (product.quantity + 1);
      } else {
        return acc + product.price * product.quantity;
      }
    }, 0);
     if(total<=1000){
      setDelStatus(<span className="text-red-500">Free Delivery For Cart Value Above 1000</span>)
     }
     else{
      setDelStatus(<span className="text-green-500">Free Delivery Applied To This Order!</span>);
     }
  
    // Update the product in the local state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? updatedProductWithIncrementedQuantity : product
      )
    );

    
    try {
      // Make an API call to update the product in the database
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductWithIncrementedQuantity),
      });
      
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        console.log("Product quantity updated successfully.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  const handleQuantityChangeDec = async(productId) =>{
   


    const updatedProduct = products.find((product) => product.productId === productId);
  
    // Increment the quantity for the found product
    const updatedProductWithIncrementedQuantity = { ...updatedProduct, quantity:Math.max(updatedProduct.quantity - 1,0) };
  
    // Update the product in the local state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? updatedProductWithIncrementedQuantity : product
      )
    );


    const total = products.reduce((acc, product) => {
      if (product.productId === productId) {
        return acc + product.price * (product.quantity - 1);
      } else {
        return acc + product.price * product.quantity;
      }
    }, 0);
     if(total<=1000){
      setDelStatus(<span className="text-red-500">Free Delivery For Cart Value Above 1000</span>)
     }
     else{
      setDelStatus(<span className="text-green-500">Free Delivery Applied To This Order!</span>);
     }
  
    try {
      // Make an API call to update the product in the database
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductWithIncrementedQuantity),
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        console.log("Product quantity updated successfully.");
      }
    } catch (error) {
      console.error(error);
    }
  


    if(products.filter((product) => product.productId === productId)[0].quantity === 1){
      setProducts((prevProducts) =>
      prevProducts.filter((product) =>
        product.productId !== productId
      ) 
    );
    deleteProductIfQuantityZero(productId);
}
  }

const delivery =products.reduce((acc, product) => acc + product.price * product.quantity, 0)>1000?0:70;

if(delivery>1000){
  setDelStatus("Free Delivery Applied For This Order!");
}

  const deleteProductIfQuantityZero = async (productId) => {
    // Find the product in the products array with the given productId
    const productToDelete = products.find((product) => product.productId === productId);
  
    // Check if the product's quantity is zero
    // if (productToDelete && productToDelete.quantity === 0) {
      try {
        // Make an API call to delete the product from the database
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(response.statusText);
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
    {products.length === 0 ?  (
    <>
      <Navbar />
      <div className="flex justify-center items-center text-3xl font-bold h-screen">No items in your cart!</div>
      </>
    ) : (
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
      <div className="flex mt-6 mb-20 text-4xl font-bold justify-center">
        Items in your cart!
      </div>
      <div className="flex  justify-around">
      <div className="flex flex-col ">
      {/* <div className="border-2 border-gray-500 w-full mt-10" /> */}
      {products.map((product) => (
        <div className="flex flex-col ">
            <div className="flex justify-between  bg-gray-100 border-2 border-gray-300 p-4 shadow-xl rounded-xl text-current hover:no-underline hover:text-current" key={product.productId}>
          <div className="flex flex-col justify-around h-60 ml-10">
            <div className="flex justify-center px-1 mt-8 text-xl font-bold">ITEM</div> 
            <Link to={`/${product.productName}`} className="flex gap-24 text-xl justify-between items-center mt-4 text-current hover:no-underline hover:text-current">
              <div className="w-48 border-2 border-black">
              <img className='h-36 w-48'  src={`http://localhost:8080/api/allproducts/image0/${product.productName}`} alt="img" />
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
            </Link>
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
        </div>
        </div>
        
      ))}

      </div>
      <div className="flex flex-col gap-4 w-auto items-center h-auto ">
  <div className="flex flex-col w-auto py-10 px-20 justify-between bg-gray-100 border-2 border-gray-300 shadow-xl rounded-xl gap-10 ">
    <div className="flex justify-center items-center text-3xl font-semibold mb-6">ORDER SUMMARY</div>
    <div className="flex justify-around items-center gap-10">
      <div className="flex flex-col text-2xl font-bold items-start justify-around gap-8">
        <div>TOTAL ITEMS</div>
        <div>PRICE</div>
        <div>DELIVERY CHARGES</div>
        <div>SUBTOTAL</div>
      </div>

      <div className="flex flex-col text-2xl justify-around gap-10">
        <div>
          {products.reduce((acc, product) => acc + product.quantity, 0)}
        </div>
        <div>
          Rs. {products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
        </div>
        <div>
          Rs. {delivery}
        </div>
        <div>
          Rs. {products.reduce((acc, product) => acc + product.price * product.quantity, delivery)}
        </div>
      </div>
    </div>
  </div>

<Link to="/CheckOut" className="text-current hover:text-current hover:no-underline">
        <button
            type="button"
            className=" bg-green-400 rounded-2xl w-48 h-24 flex flex-wrap p-2 justify-center items-center text-2xl font-bold mt-4 hover:bg-green-500"
            
          >
            Proceed To CheckOut
            </button>
</Link>

  <div className="text-2xl">
    {delStatus}
  </div>
</div>


      </div>
      <Footer />
    </div>
    </>
    )}
    </>
    
        
        
    
  );
}

export default Cart;
