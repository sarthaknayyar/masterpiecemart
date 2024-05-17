import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Cart() {
    const location = useLocation();
    const { state } = location;

  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [delStatus,setDelStatus] = useState(<span className="text-red-500">Free Delivery For Order Value Above 1000</span>);

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
        const total = state.price;
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

  





const delivery =state.price>1000?0:70;



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


  
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: ""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can handle form submission here
      console.log("Form data submitted:", formData);
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
        Fill Out Details!
      </div>
      <div className="flex  justify-around">
      {/* <div className="flex flex-col "> */}
      {/* <div className="border-2 border-gray-500 w-full mt-10" /> */}
      {/* {products.map((product) => ( */}
        <div className="flex flex-col bg-gray-100 p-4 rounded-xl text-2xl font-bold w-1/3 border-2 border-gray-300 shadow-xl">
            <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <label htmlFor="firstName" className="w-52">First Name:</label>
          <textarea
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="lastName" className="w-52">Last Name:</label>
          <textarea
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="address" className="w-52">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="city" className="w-52">City:</label>
          <textarea
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="state" className="w-52">State:</label>
          <textarea
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="country" className="w-52">Country:</label>
          <textarea
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="phone" className="w-52">Phone No.:</label>
          <textarea
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="email" className="w-52">Email:</label>
          <textarea
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border rounded-xl border-black px-3 py-2"
          />
        </div>
        
      </form>
      
    {/* </div> */}
        </div>
        
      {/* ))} */}

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
          1
        </div>
        <div>
          Rs. {state.price}
        </div>
        <div>
          Rs. {delivery}
        </div>
        <div>
          Rs. {(state.price +  delivery)}
        </div>
      </div>
    </div>
  </div>

  <div className="text-2xl">
    {delStatus}
  </div>
</div>


      </div>
<div className="flex justify-center mt-8">

      <button
            type="button"
            className=" bg-green-400 rounded-2xl w-56 h-28 flex flex-wrap border-2 border-black p-2 justify-center items-center text-3xl font-bold mt-4 hover:bg-green-500 hover:shadow-xl hover:border-2 hover:border-black hover:bg-red-600"
            
          >
            Proceed To Pay
            </button>
</div>
      
    </div>
    </>
    )}
    </>
    
        
        
    
  );
}

export default Cart;
