import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/UserSlice';

const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);


  console.log("user: ", user);

  const handleLoggout = async () => {
    const response = await fetch(SummaryApi.loggout_user.url, {
      method: SummaryApi.loggout_user.method,
      credentials: "include"
    })

    const data = await response.json();
    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null));
    } else {
      toast.error(data.error)
    }
  }


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

          <div className='relative flex justify-center'>
            <div className='text-3xl cursor-pointer' onClick={() => setOpenMenu(preve => !preve)}>
              {
                user?.profilePic ? (
                  <img src={user?.profilePic} alt={user?.name} className='w-8 h-8 object-cover rounded-full cursor-pointer' />
                ) : (
                  <CgProfile />
                )
              }
            </div>

            {
              openMenu && (
                <div className='absolute h-fit  bottom-0 top-11 bg-white p-2 shadow-lg rounded'>
                  <nav>
                    <Link to={'/admin-panel'} className='whitespace-nowrap hover:bg-slate-100 p-2'>
                      Admin panel
                    </Link>
                  </nav>
                </div>
              )
            }

          </div>

          <div className='text-2xl relative'>
            <span><FaShoppingCart /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>0</p>
            </div>
          </div>

          <div className='login'>

            {
              user?._id ? (
                <button onClick={handleLoggout} className='text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1'>Logout</button>
              ) : (
                <Link to={"/login"} className='text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1'>Login</Link>
              )
            }

          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
