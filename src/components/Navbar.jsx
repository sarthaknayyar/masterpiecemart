import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div class="navbar">
      
        <div class="nav-logo">
          <a href="Index.html">MasterPiece Mart</a>
        </div>

        <div class="search">
          <input class="input-box" placeholder="Search MasterPiece Mart" />
          <div class="search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div class="shop-art">
          <Link className="text-black" to="/">Shop Art</Link>
        </div>

        <div class="wishlist">
         <Link className='text-black' to="/Wishlist">Wishlist</Link>
        </div>
        <div class="cart"><Link className="text-black" to='/Cart' >Cart</Link></div>
        

        <div class="login">
          <Link className='text-black' to='/Login'>Login</Link> <i class="fa-solid fa-user"></i>
        </div>

        <div className='addProduct'>
          <Link className='text-black' to='/AddProduct' >Add Product</Link>
        </div>
      </div>
  )
}

export default Navbar
