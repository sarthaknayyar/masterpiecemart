import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Cart from './pages/Cart.jsx'
import Navbar from './components/Navbar.jsx'
import { Routes } from 'react-router-dom/dist/index.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProductPage from './pages/AllProductPage.jsx'
import { useEffect } from 'react';
import StarryNight from './pages/Product/StarryNight.jsx';
import Doe from './pages/Product/Doe.jsx';
import AddProduct from './AddProduct.jsx'
import Wishist from './pages/Wishlist.jsx'
import Blog from './pages/Blog.jsx'
import CreatePost from './pages/CreatePost.jsx'
import PostDetail from './pages/PostDetail.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import CheckOut from './pages/CheckOut.jsx'


function App() {
  const [count, setCount] = useState(0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data when component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/allproducts');
      const data = await response.json();
      setProducts(data); // Assuming data is an array of products with IDs
      // console.log("hi " + products)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
//  const element = product.productName;
  const productsRoutes = products.map(product => (
    // console.log("b "+product.data1.name),
    <Route
      key={product.productId}
      path={`/${product.productName}`}
      element={<StarryNight productId={product.productId} productName={product.productName} artistName = {product.artistName} artistId={product.artistId} price={product.price} productImage = {product.productName} productSubImage1 ={product.data1.name} productSubImage2 = {product.data2.name} productDescription= {product.productDescription}/>}
      
    />
  ));

  return (
    // payment and all products page
    <>
    <Router>
      <div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true}/>
        <Routes>
        {productsRoutes}
        <Route path='/Cart' element={<Cart />} />
        <Route path='/' element={<AllProductPage />} />
        <Route path='/AddProduct' element={<AddProduct />} />
        <Route path="/Wishlist" element={<Wishist/>}></Route>
        <Route path='/Blog' element={<Blog />}></Route>
        
        <Route path='/api/posts' element={<CreatePost />}></Route>
        <Route path='/api/posts/:id' element={<PostDetail />}></Route>
        <Route path='/Login' element ={<Login />}></Route>
        <Route path='/SignUp' element ={<SignUp />}></Route>
        <Route path='/CheckOut' element ={<CheckOut />}></Route>
        </Routes> 
      </div>
      
    </Router>
    {/* <AllProductPage /> */}
    

    </>
  )
  // const notify = () => toast("Wow so easy!");

  //   return (
  //     <div>
  //       <button onClick={notify}>Notify!</button>
  //       <ToastContainer />
  //     </div>
  //   );
}

export default App


