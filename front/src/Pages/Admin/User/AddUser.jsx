import React, { useState } from 'react'
import Footer from '../../../Components/Footer/Footer'
import Sidebar from '../../../Components/Navbar/Sidebar'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';
import SellerNavbar from '../../../Components/Navbar/Seller/SellerNavbar';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../../Components/Functions';

const Buttons = ({createFun, condittion}) => {
  return(
      <div className='flex space-x-2 items-stretch'>
          <Link to={'/admin/readUser'} className='px-8 py-2 text-gray-800 opacity-80 hover:border-blue-600 hover:text-blue-700 hover:bg-white transition-all border-2 border-transparent'>Cancel</Link>
          <button 
              onClick={createFun} 
              disabled={condittion}
              className={`${condittion ? "opacity-40" : "opacity-100 hover:border-blue-600 hover:text-blue-700 hover:bg-white "} bg-blue-600 text-white transition-all border-2 border-transparent px-8 py-2 rounded-sm`}
          > Create </button>
      </div>
  )
}
function AddUser() {
    const navigate = useNavigate();
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('client')
    const newUser = {
        lname: lastname,
        fname: firstname,
        email: email,
        password: password,
        role: role
    }

    let condittion = lastname.length === 0 || firstname.length === 0 || email.length === 0 || password.length === 0 


    console.log(newUser);


    const Create = (e) => {
        // e.preventDefault();
        console.log("Created !");

        axios.post(`${BaseUrl}/api/users/`, newUser, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(res => {
                console.log(res);
                navigate("/admin/readUser")
            })
            .catch(err => {
                console.log(err);
            })
    }


  return (
    <>
     <SellerNavbar />

    <main className='min-h-screen flex mt-28'>
      <Sidebar />
      <article className='flex-1'>
          <header className='w-full mb-6 px-8 justify-between flex text-center items-center'>
              <div className='flex space-x-3 text-gray-800 '>
                  <Link to={"/admin/readUser"} className='flex px-4 border-2 text-gray-600 border-gray-200 rounded-sm items-center bg-white hover:border-blue-600 hover:text-blue-700 hover:bg-white transition-all py-2 space-x-1'> 
                      <FaArrowLeft size={20} />
                  </Link>
                  <h1 className='text-2xl font-medium text-gray-800'> Add New User </h1>
              </div>
          </header>
          <main className='bg-gray-100 px-8 py-6 rounded-sm'>
              <div  className='bg-white px-6 py-6 rounded-sm '>
                  <div className='w-full flex items-stretch space-x-8'>
            

                      <div className='flex-1'>
                          <div className='py-2'>
                              <div className='flex flex-col'>
                                  <label className=' font-medium text-gray-600'> First Name </label>
                                  <input onChange={(e)=> setFirstname(e.target.value)} type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='First Name' />
                              </div>
                          </div>
                        
                          <div className='py-2'>
                              <div className='flex flex-col'>
                                  <label className=' font-medium text-gray-600'> Last Name </label>
                                  <input onChange={(e)=> setLastname(e.target.value)} type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Last Name' />
                              </div>
                          </div>
                          <div className='py-2'>
                              <div className='flex flex-col'>
                                  <label className=' font-medium text-gray-600'> Email </label>
                                  <input onChange={(e)=> setEmail(e.target.value)} type='email' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Email' />
                              </div>
                          </div>
                          <div className='py-2'>
                              <div className='flex flex-col'>
                                  <label className=' font-medium text-gray-600'> Password </label>
                                  <input onChange={(e)=> setPassword(e.target.value)} type='password' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Password' />
                              </div>
                          </div>

                        

                      </div>
                  </div>

                  <div className='flex justify-end mt-10'>
                      <Buttons condittion={condittion} createFun={Create} />
                  </div>
              </div>
          </main>
      </article>
    </main>

    <Footer />
  </>
  )
}

export default AddUser