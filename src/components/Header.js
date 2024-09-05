import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex justify-between items-center px-4'>
        <div className='logo'>
          <Link to="/">
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className='search hidden lg:flex w-full justify-between max-w-sm border rounded-full pl-2 focus-within:shadow-md'>
          <input type='text' placeholder='Search product here...' className='outline-none border-none w-full' />
          <div className='min-w-[50px] text-lg bg-red-600 text-white flex items-center justify-center rounded-r-full'>
            <GrSearch />
          </div>
        </div>

        <div className='user-icons flex items-center gap-6'>

          <div className='text-3xl cursor-pointer'>
            <CgProfile />
          </div>

          <div className='text-2xl relative'>
            <span><FaShoppingCart /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          <div className='login'>
            <Link to={"/login"} className='text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1'>Login</Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
