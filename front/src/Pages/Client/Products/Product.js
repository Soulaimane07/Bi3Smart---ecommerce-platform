import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BaseUrl, sizes } from '../../../Components/Functions';
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsBox2 } from "react-icons/bs";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { productActions } from '../../../redux/Slices/ProductSlice';
import { getPanier } from '../../../redux/Slices/PanierSlices';
import { authPageActions } from '../../../redux/Slices/AuthSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Product() {
    const productItem = useSelector(state => state.ProductPage.product)
    const [size, setSize] = useState(null)

    const condition = !productItem | size === null
    
    const dispatch = useDispatch()
    
    const closeProduct = () => {
        dispatch(productActions.close())
    }

    let userId= useSelector(state => state.User.data?.id)

    const AddCart = () => {
        if(userId === undefined){
            dispatch(authPageActions.open())
        }else{
            let panier = {
                "userId": userId,
                "productId": productItem?.id,
                "prix": productItem?.prix,
                "quantite": 1,
                "size": size
            }
        
            axios.post(`${BaseUrl}/api/panier/`, panier)
                .then((res)=> {
                    dispatch(getPanier(userId))
                    dispatch(productActions.openAdded())
                    
                    setTimeout(() => {
                        dispatch(productActions.closeAdded())
                    }, 3000);
                })
                .catch((err)=> {
                    console.error(err);
                })
        }
    }

    let addedToPanier = useSelector(state => state.ProductPage.addedToPanier)




  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 transition-all w-full h-full z-40 mx-0 flex justify-center items-center'>
        <div className='relative flex flex-col md:flex-row items-stretch md:space-x-8 bg-white text-black h-fit w-full mx-4 md:w-1/2 rounded-lg py-4 md:py-10 px-4 md:px-10'>
            <div style={{ backgroundImage: `url(${productItem.image})` }} className='w-full md:w-1/3 h-40 md:h-auto bg-contain; bg-cover rounded-md overflow-hidden bg-red-600 '>
                {/* <img src={productItem.image} alt='' className=' max-h-full h-auto' /> */}
            </div>
            <div className='flex-1 flex flex-col clear-start mt-6 md:mt-0'>
                <div className='flex-1 h-full'>
                    <h1 className='text-2xl font-medium'> {productItem.titre} </h1>
                    <h2 className='text-2xl font-bold mt-2'> ${productItem.prix} </h2>
                    <div className='border-t-2 py-2 border-dotted mt-6'>
                        <h1> Size </h1>  
                        <div className='flex items-center justify-between space-x-4 mt-1'>
                            {sizes.map((item,key)=>(
                                <button 
                                    key={key} 
                                    onClick={()=> setSize(item)} 
                                    className={`${item === size && 'border-black'} w-full py-1 border-2 transition-all hover:border-black rounded-full`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='bg-gray-100 py-2 px-4 rounded-md mt-6 mb-6'>
                        <div className='flex opacity-70  py-1 rounded-md items-center space-x-3'>
                            <LiaShippingFastSolid size={20} color='green' />
                            <h1 className='  text-sm'> Free Shipping </h1>
                        </div>
                        <div className='flex opacity-70 py-1 rounded-md items-center space-x-3'>
                            <HiOutlineInboxArrowDown size={20} color='green' />
                            <h1 className='  text-sm'> Free Return & Exchange </h1>
                        </div>
                        <div className='flex opacity-70 py-1 rounded-md items-center space-x-3'>
                            <BsBox2 size={20} color='green' />
                            <h1 className='  text-sm'> Sold by Bi3Smart </h1>
                        </div>
                    </div>
                </div>

                <button
                    onClick={AddCart}
                    disabled={condition}
                    className={`${condition ? 'opacity-40' : 'opacity-100 hover:scale-105'} transition-all uppercase text-md bg-blue-600 w-full text-white py-2.5 rounded-md`}
                > Add to cart </button>
            </div>
            
            <button onClick={closeProduct} className=' absolute top-4 right-4 md:right-10 hover:scale-110 opacity-70  transition-all'>
                <IoClose size={24} />
            </button>
            

            {addedToPanier &&
                <div className='fixed top-20  left-0 flex justify-center w-full'>
                    <div id="toast-default" className=" mx-auto flex items-center w-fit  p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                            </svg>
                            <span className="sr-only">Fire icon</span>
                        </div>
                        <h1 className="ms-3 text-sm font-normal mr-10"> The product is added to your panier. </h1>
                        <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
                            <Link to={"/panier"} className="text-sm font-medium transition-all px-3 text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg"> Visit panier </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Product