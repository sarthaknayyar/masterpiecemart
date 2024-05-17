import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="bg-gray-200 flex justify-around items-center h-16 px-6 gap-8 border-2 border-gray-300 rounded-xl mt-1  shadow-xl">
      
      <div className="flex items-center gap-8">
        <div className="mr-4 flex text-black text-2xl font-bold hover:text-current hover:no-underline">
          <Link className='text-black text-2xl font-bold hover:text-current hover:no-underline transition-transform transform hover:scale-110 hover:font-bold hover:text-3xl ' to='/'>MasterPiece Mart</Link>
        </div>

        <div className="flex items-center w-80 rounded-2xl ">
          <input className="input-box mr-2 w-40 rounded-2xl border-2 "  placeholder="Search MasterPiece Mart" />
          <div className="">
            <i className=""></i>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className=" mr-4 flex">
          <Link className="text-black hover:text-current hover:no-underline transition-transform transform hover:scale-110 hover:font-bold hover:text-3xl" to="/AddProductPage">Shop Art</Link>
        </div>

        <div className=" mr-4 flex">
          <Link className="text-black hover:text-current hover:no-underline transition-transform transform hover:scale-110 hover:font-bold hover:text-3xl" to="/Wishlist">Wishlist</Link>
        </div>

        <div className="mr-4 flex ">
          <Link className="text-black hover:text-current hover:no-underline transition-transform transform hover:scale-110 hover:font-bold hover:text-3xl mr-2" to="/Cart">Cart</Link>
        </div>

        <div className=" mr-4 flex items-center">
          <Link className="text-black hover:text-current hover:no-underline transition-transform transform hover:scale-110 hover:font-bold hover:text-3xl mr-2" to="/Login">Login</Link> 
          <i className=""></i>
        </div>

        <div className=" flex">
          <Link className="text-black hover:text-current hover:no-underline transition-transform transform hover:scale-110 hover:font-bold hover:text-3xl" to="/AddProduct">Add Product</Link>
        </div>
      </div>

    </div>
  )
}

export default Navbar
