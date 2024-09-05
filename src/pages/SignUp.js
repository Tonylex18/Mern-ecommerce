import React, { useState } from 'react'
import LoginIcon from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imagetobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const navigate = useNavigate();
  // extract data from input
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file)
    // console.log("imagePic", imagePic);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const userData = await response.json()

      if (userData.success) {
        toast.success(userData.message)

        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          profilePic: "",
        });

        setTimeout(() => {
          navigate('/login')
        }, 2500)
      } else {
        toast.error(userData.message)
      }

      console.log("data: ", userData);

    } else {
      toast.error("Password not matched")
    }
  }

  return (
    <section id='login'>
      <div className='container mx-auto p-4'>
        <div className='bg-white w-full max-w-md p-2 py-5 mx-auto'>
          <div className='w-20 h-20 mx-auto mb-10 relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || LoginIcon} alt='login icon' />
            </div>
            <form>
              <label>
                <div className='text-xs pb-5 pt-2 bg-slate-200 bg-opacity-80 cursor-pointer font-medium absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='grid gap-4' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name : </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  value={data.name}
                  name='name'
                  onChange={handleOnchange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={data.email}
                  name='email'
                  onChange={handleOnchange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div className='grid '>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnchange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {
                      showPassword ?
                        (
                          <FaEyeSlash />
                        )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className='grid '>
              <label>Confirm Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Enter password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnchange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span>
                    {
                      showConfirmPassword ?
                        (
                          <FaEyeSlash />
                        )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:transition-all mx-auto block'>Sign Up</button>
          </form>
          <p className='mt-3'>Already have an account ? <Link to={"/login"} className='hover:text-red-600 duration-200 hover:transition-all'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
