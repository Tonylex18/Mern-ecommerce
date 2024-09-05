import React, { useState } from 'react'
import LoginIcon from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // extract data from input
    const [data, setData] = useState({
        email: "",
        password: "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.login.url, {
            method: SummaryApi.login.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const userData = await response.json()

        if (userData.success) {
            toast.success(userData.message)
            setTimeout(() => {
                navigate('/')
            }, 2000)

        } else {
            toast.error(userData.message)

        }
    }

    return (
        <section id='login'>
            <div className='container mx-auto p-4'>
                <div className='bg-white w-full max-w-md p-2 py-5 mx-auto'>
                    <div className='w-20 h-20 mx-auto mb-10'>
                        <img src={LoginIcon} alt='login icon' />
                    </div>

                    <form className='grid gap-4' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    value={data.email}
                                    name='email'
                                    onChange={handleOnchange}
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
                            <Link to={"/forgot-password"} className='block ml-auto w-fit hover:text-red-600 hover:underline duration-200 mt-3'>
                                Forgot Password?
                            </Link>
                        </div>

                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:transition-all mx-auto block'>Login</button>
                    </form>
                    <p className='mt-3'>Don't have an account ? <Link to={"/signup"} className='hover:text-red-600 duration-200 hover:transition-all'>Sign Up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login