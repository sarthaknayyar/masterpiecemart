import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Await, Link } from 'react-router-dom';
import Footer from '../components/Footer';

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(); // Fetch products data when component mounts
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/allproducts'); // Replace with your backend endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      setProducts(data);
      if(data){
        console.log(data)
      }
      // await console.log(products) // Update state with fetched products
    } catch (error) {
      console.error(error);
      // Handle error fetching products
    }
  };

  

  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleMouseEnter = productId => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  return (
    <>
    <Navbar />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-orange-50 mb-40">
      {products.map(product => (
        <Link key={product.productId} className={`p-4 bg-gray-100 border-2 border-gray-200 hover:no-underline  text-black rounded-lg transition duration-300 ${
          hoveredProductId === product.productId ? 'shadow-xl' : 'shadow-md'
        }`}
        onMouseEnter={() => handleMouseEnter(product.productId)}
        onMouseLeave={handleMouseLeave} to={`/${product.productName}`}>
          <div className='flex flex-col items-center'>
          <img className='w-80 h-60' src={`http://localhost:8080/api/allproducts/image0/${product.imageName}`} alt={product.productName} />
          <div className='flex flex-col items-center mt-4 text-lg' >
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <p className="text-gray-600">{product.artistName}</p>
          <p className="text-gray-900 font-semibold">Rs. {product.price}</p>
          </div>
          
          </div>
          
        </Link>
      ))}
    </div>
    <Footer />
    </>
  );
}

export default ProductGrid;
