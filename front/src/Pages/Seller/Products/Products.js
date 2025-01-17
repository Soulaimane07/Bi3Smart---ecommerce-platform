import React from 'react'
import SellerNavbar from '../../../Components/Navbar/Seller/SellerNavbar'
import SellerSidebar from '../../../Components/Navbar/Seller/SellerSidebar'
import Footer from '../../../Components/Footer/Footer'
import { GetProductbyIDSeller, GetProducts, Removeproduct } from '../../../Components/Functions';
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { CiEdit, CiTrash } from 'react-icons/ci';



function Products() {
    let products = GetProductbyIDSeller()

  return (
    <>
      <SellerNavbar />

      <main className='min-h-screen flex mt-28'>
        <SellerSidebar />

        <article className=' flex-1 px-8 py-2'>
            <header className='w-full mb-8 justify-between flex text-center'>
                <h1 className='text-2xl font-medium'> Products ({products?.length}) </h1>
                <Link to={"add"} className='flex items-center px-6 border-2 bg-blue-600 text-white border-blue-600 hover:text-blue-700 hover:bg-white transition-all  rounded-sm py-2 space-x-1'> 
                    <IoAdd size={20} />
                    <p> Product </p>
                </Link>
            </header>

            <main className='grid grid-cols-4 px-20'>
                {products?.map((item,key)=>(
                    <div key={key} className='mb-8 mx-2 shadow-lg rounded-md overflow-hidden'>
                        <div className=' relative h-80'>
                            <img className='w-full h-full mx-auto ' src={item.image} alt='logo' /> 

                            <div className=' pt-4 pb-2 bottom-0 bg-white w-full absolute text-center text-lg mt-2 font-medium flex justify-between px-4'> 
                              <div className=' text-left'>
                                <h1>{item.titre}</h1>
                                <h1 >${item.prix}</h1>
                              </div>
                              <div className='flex justify-normal space-x-2 items-center '>
                                <button onClick={()=>Removeproduct(item.id)} className= ''><CiTrash size={25} /></button> 
                                <Link to={`update/${item.id}`} ><CiEdit size={25} /></Link>
                              </div>
                            </div>
                           
                        </div>
                    </div>
                ))}
            </main>
        </article>
      </main>

      <Footer />
    </>
  )
}

export default Products