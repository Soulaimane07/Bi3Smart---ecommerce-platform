import React, { useEffect } from "react"
import Navbar from "../../../Components/Navbar/Navbar"
import Footer from "../../../Components/Footer/Footer"
import {Product} from "../../../Components/Product/Product"
import { useSelector, useDispatch } from 'react-redux';
import { authPageActions } from "../../../redux/Slices/AuthSlice"
import { getFavorits } from "../../../redux/Slices/FavoritsSlice"
import { TopPage } from "../../../Components/Functions"

function Favorits(){
    TopPage()

    let list = useSelector(state => state.Favorits.products)

    const dispatch = useDispatch()
    const OpenAuth = () => {
        dispatch(authPageActions.open())
    }

    let userId = useSelector(state => state.User.data?.id)
    
    useEffect(()=> {
        userId && dispatch(getFavorits(userId))
    }, [dispatch, userId])

    return (<>
        <Navbar/>
        <main className='min-h-screen mt-28 flex items-start'>
            {/* <Filtrage/> */}

            <div className='w-full border-l-2 border-gray-100 min-h-screen'>
                <h1 className=' text-3xl text-center font-medium px-10 mt-4 py-8 rounded-md'> My WishList</h1>
                
                {list?.length !== 0 ?
                    <div className='grid grid-cols-1 md:grid-cols-5 gap-2 px-6 md:px-20 flex-1'>
                        {list?.map((item,key)=>
                            <Product item={item.productId} key={key} favorit={true} />
                        )}
                    </div>
                    :
                    <div>
                        <h1 className="text-center mt-1 opacity-80"> You currently have nothing saved to your Wishlist. <br /> Personalize your shopping experience with your Wishlist. </h1>
                    </div>
                }

                {!userId &&
                    <div className="mt-20 flex flex-col justify-center items-center">
                        <h1 className="text-center text-lg font-medium mb-3"> Already have items saved? </h1>
                        <button onClick={OpenAuth} className="border-2 text-blue-500 border-blue-500 uppercase hover:bg-blue-500 transition-all hover:text-white py-2 px-14 w-fit rounded-md"> Sign In  /  Register </button>
                    </div>
                }
            </div>
        </main>
        <Footer/>    
    </>)
}
export default Favorits 