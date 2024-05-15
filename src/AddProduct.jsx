import React, { useState } from 'react';
import Navbar from './components/Navbar';

function AddProduct() {

  const [formData, setFormData] = useState({
    artistId: '',
    artistName: '',
    price: 0,
    productName: '',
    productImage: null,
    productId: '',
    productDescription: ''
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'productImage') {
      // Check if files property exists and is not null
      if (files && files.length > 0) {
        setFormData({
          ...formData,
          [name]: files[0] // Store the file object directly
        });
      } else {
        // Clear the productImage state if no file is selected
        setFormData({
          ...formData,
          [name]: null
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
      formDataToSend.append('file', formData.productImage);

      const response = await fetch('http://localhost:8080/api/allproducts', {
        method: 'POST',
        body: formDataToSend, // Send the FormData object
      });

      if (!response.ok) {
        console.log(formData);
        throw new Error('Failed to add product');
      }

      setMessage('Product added successfully!');
      // Optionally, reset the form after successful submission
      setFormData({
        productName: '',
        artistName: '',
        productDescription: '',
        price: 0,
        artistId: '',
        productImage: null,
        productId: ''
      });
    } catch (error) {
      setMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className='p-4 m-2 h-screen '>
        <div className='text-3xl text-black font-bold flex justify-center'>ADD PRODUCT</div>
        <div className='text-black flex justify-center items-center p-8 m-4'>
          <div className='text-black flex flex-col mx-40 w-1/2'>
            <div className='flex flex-col bg-gray-100 p-4 my-4 items-center rounded-xl shadow-xl'>
              <div className='text-2xl font-bold mb-8'> PRODUCT DESCRIPTION</div>
              <div className='flex gap-4 h-80'>
                <div className='flex flex-col gap-8 justify-between'>
                  <div className='text-lg h-24 flex items-center'>Product Name :</div>
                  <div className='text-lg h-24 flex items-center'>Artist Name :</div>
                  <div className='text-lg h-48 flex items-center'>Product Description :</div>
                  <div className='text-lg h-24 flex items-center'>Product Id :</div>
                  <div className='text-lg h-24 flex items-center'>Artist Id :</div>
                </div>
                <div className='flex flex-col gap-8 justify-between '>
                  <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} placeholder='Name of the product' className='w-96 h-12 rounded-lg border-black border'/>
                  <input type="text" name="artistName" value={formData.artistName} onChange={handleInputChange} placeholder='Name of the artist' className='w-96 h-12 rounded-lg border '/>
                  <input type="text" name="productDescription" value={formData.productDescription} onChange={handleInputChange} placeholder='Brief description of the product' className='w-96 h-24 rounded-lg text-wrap border'/>
                  <input type="text" name="productId" value={formData.productId} onChange={handleInputChange} placeholder='Id of the product' className='w-96 h-12 rounded-lg border '/>
                  <input type="text" name="artistId" value={formData.artistId} onChange={handleInputChange} placeholder='Id of the artist' className='w-96 h-12 rounded-lg border '/>
                </div>
              </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 my-4 items-center rounded-xl shadow-xl'>
              <div className='text-2xl font-bold mb-8'> PRODUCT PRICE</div>
              <div className='flex gap-4 '>
                <div className='flex flex-col text-xl justify-between h-28 '>
                  <div className='text-lg h-12 flex items-center justify-between'>Price : </div>
                </div>
                <div className='flex flex-col justify-between '>
                  <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder='Price of the product' className='w-96 h-12 rounded-lg border'/>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-gray-100 p-4 my-4 h-96 items-center rounded-xl shadow-xl '>
            <div className='text-2xl font-bold mb-8'> PRODUCT IMAGES</div>
            <div className='flex gap-4 h-96'>
              <div className='flex flex-col text-xl justify-between h-68 '>
                <div className='text-lg flex items-center justify-between w-32'>Cover Picture : </div>
              </div>
              <div className='flex flex-col justify-between '>
                <input name='productImage' type='file' onChange={handleInputChange} className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center h-20'>
          <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-md px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SUBMIT</button>
        </div>
        {message && <div className="flex justify-center text-xl font-bold text-red-500">{message}</div>}
      </div>
    </>
  );
}

export default AddProduct;
