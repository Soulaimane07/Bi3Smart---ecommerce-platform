import React, { useState } from 'react'
import SellerNavbar from '../../../Components/Navbar/Seller/SellerNavbar'
import Footer from '../../../Components/Footer/Footer'
import SellerSidebar from '../../../Components/Navbar/Seller/SellerSidebar'
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl, GetCategories } from '../../../Components/Functions';
import axios from 'axios';
import Error from '../../../Components/Error/Error';
import { useSelector } from 'react-redux';

const Buttons = ({createFun, condittion, loading}) => {
    return(
        <div className='flex space-x-2 items-stretch'>
            <Link to={'/seller/products'} className='px-8 py-2 text-gray-800 opacity-80 hover:border-blue-600 hover:text-blue-700 hover:bg-white transition-all border-2 border-transparent'>Cancel</Link>
            <button 
                onClick={createFun} 
                disabled={condittion}
                className={`${condittion ? "opacity-40" : "opacity-100 hover:border-blue-600 hover:text-blue-700 hover:bg-white "} flex items-center bg-blue-600 text-white transition-all border-2 border-transparent px-8 py-2 rounded-sm`}
            > 
                {loading 
                    ? 
                        <div role="status">
                            <svg aria-hidden="true" className="w-5 h-5 text-white animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    : 
                        <p> Create </p>
                }
            </button>
        </div>
    )
}


function AddProduct() {
    const categories = GetCategories()

    const [titre, setTitre] = useState('')
    const [prix, setPrix] = useState(0)
    const [categorie, setCategorie] = useState(0)
    const [image, setImage] = useState(null)
    let userid = useSelector(state=>state.User.data.id)

    const newProduct = {
        titre: titre,
        prix: Number(prix),
        categorie: Number(categorie),
        image: image,
        seller: userid,
    }

    let condittion = titre.length === 0 || categorie === 0 || image === null



    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const Create = (e) => {
        e.preventDefault();
        setMessage(null)
        setLoading(true)

        axios.post(`${BaseUrl}/api/products/`, newProduct, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(res => {
                console.log("Created", res.data);
                setLoading(false)
                navigate('/seller/products')
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                setMessage("Product didn't created.")
                setTimeout(() => {
                    setMessage(null)
                }, 2000);
            })
    }


    
  return (
    <>
      <SellerNavbar />

      <main className='min-h-screen flex mt-28'>
        <SellerSidebar />

        <article className='flex-1'>
            <header className='w-full mb-6 px-8 justify-between flex text-center items-center'>
                <div className='flex space-x-3 text-gray-800 '>
                    {/* <Link to={"/seller/products"} className='flex px-4 border-2 text-gray-600 border-gray-200 rounded-sm items-center bg-white hover:border-blue-600 hover:text-blue-700 hover:bg-white transition-all py-2 space-x-1'> 
                        <FaArrowLeft size={20} />
                    </Link> */}
                    <h1 className='text-2xl font-medium text-gray-800'> Add New Product </h1>
                </div>

                {message && <Error message={message} close={()=> setMessage(null)} />}

                <Buttons condittion={condittion} createFun={Create} loading={loading} />
            </header>

            <main className='bg-gray-100 px-8 py-6 rounded-sm'>
                <form action={Create}  className='bg-white px-6 py-6 rounded-sm '>
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
                                    <label className=' font-medium text-gray-600'> Product Name </label>
                                    <input onChange={(e)=> setTitre(e.target.value)} type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Product Name' />
                                </div>
                            </div>
                            <div className='flex-1 py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Category </label>
                                    <select onChange={(e)=> setCategorie(e.target.value)} className='border-2 px-4 py-2 rounded-sm mt-2 '>
                                        <option className=''> Select Category </option>
                                        {categories?.map((item,key)=>(
                                            <option value={item.id} key={key} className='border-2 px-4 py-2 rounded-sm mt-2'> {item.titre} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Price </label>
                                    <input onChange={(e)=> setPrix(e.target.value)} type='number' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Product Name' />
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='flex flex-col'>
                                    <label className=' font-medium text-gray-600'> Add Tag </label>
                                    <input type='text' className='border-2 px-4 py-2 rounded-sm mt-2' placeholder='Tags' />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex justify-end mt-10'>
                        <Buttons condittion={condittion} createFun={Create} loading={loading} />
                    </div>
                </form>
            </main>
        </article>
      </main>

      <Footer />
    </>
  )
}

export default AddProduct