import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { toast } from 'react-toastify';
import Footer from './components/Footer';


function AddProduct() {

  const [formData, setFormData] = useState({
    artistId: '',
    artistName: '',
    price: 0,
    productName: '',
    productImage: null,
    productId: 0,
    productDescription: '',
    subImage1: null,
    subImage2: null,
  });

  const [message, setMessage] = useState(<span></span>);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'productImage' || name==='subImage1' || name==='subImage2') {
      // Check if files property exists and is not null
    //   if (files && files.length > 0) {
        setFormData({
          ...formData,
          [name]: files[0] // Store the file object directly
        });
    //   } else {
        // Clear the productImage state if no file is selected
        // setFormData({
        //   ...formData,
        //   [name]: null
        // });
    //   }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const successMessage = () => {
    toast.success('New Product Added Successfully!');
  };

  const failMessage = () => {
    toast.error('Failed To Add Product!, Kindly Check All Fields!');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      // Append other form data fields
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('artistName', formData.artistName);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('productDescription', formData.productDescription);
      formDataToSend.append('artistId', formData.artistId);
      formDataToSend.append('productId', formData.productId);

      // Append the image file with the correct field name
      formDataToSend.append('file0', formData.productImage);
      formDataToSend.append('file1', formData.subImage1);
      formDataToSend.append('file2', formData.subImage2);

      const response = await fetch('http://localhost:8080/api/allproducts', {
        method: 'POST',
        body: formDataToSend, // Send the FormData object
      });

      if (!response.ok) {
        console.log(formData);
        throw new Error('Failed to add product');
      }
      console.log(formDataToSend);
      setMessage(<span className='text-green-500'>Product added successfully!</span>);
      
      // Optionally, reset the form after successful submission
      setFormData({
        productName: '',
        artistName: '',
        productDescription: '',
        price: 0,
        artistId: '',
        productImage: null,
        // productId: '',
        subImage1: null,
        subImage2: null,
      });
      successMessage();
    } catch (error) {
      failMessage();
      setMessage(<span className='text-red-500'>Error adding product </span>);
    }
  };

  return (
    <>
      <Navbar />
      {/* <div className='p-2 h-full bg-cover bg-center ' style={{backgroundImage: "url('/bg1.jpg')"}}> */}

      <div 
      style={{
        transform: "scale(0.72)",
        transformOrigin: "0 0",
        width: "137%",
        height: "137%",
        
      }}
      className='p-2 h-full  '>
        <div className='text-3xl text-black font-bold flex justify-center'>
         <div className='p-2 rounded-xl'>ADD PRODUCT</div> 
          </div>
        <div className='text-black flex justify-between items-center p-8 m-4'>
          <div className='text-black flex flex-col  w-1/2'>
            <div className='flex flex-col bg-gray-100 p-4 my-4 border-2 border-black items-center rounded-xl shadow-xl text-2xl'>
              <div className='text-2xl font-bold mb-8'> PRODUCT DESCRIPTION</div>
              <div className='flex gap-4 h-80'>
                <div className='flex flex-col gap-8 justify-between'>
                  <div className=' h-24 flex items-center'>Product Name :</div>
                  <div className='h-24 flex items-center'>Artist Name :</div>
                  <div className=' h-48 flex items-center'>Product Description :</div>
                  {/* <div className=' h-24 flex items-center'>Product Id :</div> */}
                  <div className='h-24 flex items-center'>Artist Id :</div>
                </div>
                <div className='flex flex-col gap-8 justify-between '>
                  <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} placeholder='Name of the product' className='border-2 k w-96 h-12 rounded-lg border-black '/>
                  <input type="text" name="artistName" value={formData.artistName} onChange={handleInputChange} placeholder='Name of the artist' className='w-96 h-12 rounded-lg border-2 border-black '/>
                  <input type="text" name="productDescription" value={formData.productDescription} onChange={handleInputChange} placeholder='Brief description of the product' className='w-96 h-24 rounded-lg text-wrap border-2 border-black'/>
                  {/* <input type="text" name="productId" value={formData.productId} onChange={handleInputChange} placeholder='Id of the product' className='w-96 h-12 rounded-lg border-2 border-black'/> */}
                  <input type="text" name="artistId" value={formData.artistId} onChange={handleInputChange} placeholder='Id of the artist' className='w-96 h-12 rounded-lg border-2 border-black '/>
                </div>
              </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 my-4 items-center rounded-xl shadow-xl border-2 border-black text-2xl'>
              <div className='text-2xl font-bold mb-8'> PRODUCT PRICE</div>
              <div className='flex gap-4 '>
                <div className='flex flex-col text-2xl justify-between h-28 '>
                  <div className=' h-12 flex items-center justify-between'>Price : </div>
                </div>
                <div className='flex flex-col justify-between '>
                  <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder='Price of the product' className='w-96 h-12 rounded-lg border-2 border-black'/>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-gray-100 p-4 my-4 h-96 items-center rounded-xl shadow-xl border-2 border-black text-2xl'>
            <div className='text-2xl font-bold mb-8'> PRODUCT IMAGES</div>
            <div className='flex gap-4 h-96'>
              <div className='flex flex-col justify-between h-68 '>
                <div className='flex items-center justify-between w-40'>Cover Picture : </div>
                <div className=' flex items-center justify-between w-40'>Sub Image1 : </div>
                <div className='flex items-center justify-between w-40'>Sub Image2 : </div>
              </div>
              <div className='flex flex-col justify-between '>
                <input name='productImage' type='file' onChange={handleInputChange} className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" />
                <input name='subImage1' type='file' onChange={handleInputChange} className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" />
                <input name='subImage2' type='file' onChange={handleInputChange} className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center h-20'>
          <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-2xl px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SUBMIT</button>
        </div>
        {message && <div className="flex justify-center text-xl font-bold text-red-500">{message}</div>}
      <Footer />
      </div>
      {/* </div> */}
    </>
  );
}

export default AddProduct;
