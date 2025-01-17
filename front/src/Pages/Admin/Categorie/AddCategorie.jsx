import React, { useState } from 'react'
import Footer from '../../../Components/Footer/Footer'
import Sidebar from '../../../Components/Navbar/Sidebar'

import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';
import SellerNavbar from '../../../Components/Navbar/Seller/SellerNavbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BaseUrl } from '../../../Components/Functions';

const Buttons = ({createFun, condittion}) => {
  return(
      <div className='flex space-x-2 items-stretch'>
          <Link to={'/admin/readCategorie'} className='px-8 py-2 text-gray-800 opacity-80 hover:border-blue-600 hover:text-blue-700 hover:bg-white transition-all border-2 border-transparent'>Cancel</Link>
          <button 
              onClick={createFun} 
              disabled={condittion}
              className={`${condittion ? "opacity-40" : "opacity-100 hover:border-blue-600 hover:text-blue-700 hover:bg-white "} bg-blue-600 text-white transition-all border-2 border-transparent px-8 py-2 rounded-sm`}
          > Create </button>
      </div>
  )
}



function AddCategorie() {
const [titre, setTitre] = useState('')
const [image, setImage] = useState(null)

const newCategory = {
    titre: titre,
    image: image
}

let condittion = titre.length === 0 || image === null

console.log(newCategory);

const navigate = useNavigate()
const Create = (e) => {
    // e.preventDefault();
    console.log("Created !");

    axios.post(`${BaseUrl}/api/categorie/`, newCategory, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(res => {
            console.log(res);
            navigate("/admin/readcategorie")
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
              <Link to={"/admin/readCategorie"} className='flex px-4 border-2 text-gray-600 border-gray-200 rounded-sm items-center bg-white hover:border-blue-600 hover:text-blue-700 hover:bg-white transition-all py-2 space-x-1'> 
                  <FaArrowLeft size={20} />
              </Link>
              <h1 className='text-2xl font-medium text-gray-800'> Add New Category </h1>
          </div>

         
      </header>

      <main className='bg-gray-100 px-8 py-6 rounded-sm'>
          <div  className='bg-white px-6 py-6 rounded-sm '>
              <div className='w-full flex items-stretch space-x-8'>
                  <div className="w-2/5 flex items-center justify-center">
                      <label htmlFor="dropzone-file" className="flex h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input onChange={(e)=> setImage(e.target.files[0])} id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" />
                      </label>
                  </div> 

                  <div className='flex-1'>
                      <div className='py-2'>
                          <div className='flex flex-col'>
                              <label className=' font-medium text-gray-600'> Category Name </label>
                              <input onChange={(e)=> setTitre(e.target.value)} type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Category Name' />
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

export default AddCategorie