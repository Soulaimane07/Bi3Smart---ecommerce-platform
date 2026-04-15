import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer';

import ProductsPanier from '../../../Components/ProductsPanier';
import { useDispatch, useSelector } from 'react-redux';
import OrderSummery from '../../../Components/OrderSummery';
import { authPageActions } from '../../../redux/Slices/AuthSlice';
import Empty from '../../../Components/Empty';
import { TopPage } from '../../../Components/Functions';

function Panier() {
    TopPage()

    let products = useSelector((state)=> state.Panier.products)
    let userId = useSelector(state => state.User.data?.id)
    
    const dispatch = useDispatch()
    
    const OpenAuth = () => {
        dispatch(authPageActions.open())
    }
    
    
    // let productsSelected = useSelector((state)=> state.Panier.productsSelected)
    // console.log(productsSelected);

    
    return (
        <>
            <Navbar />
            
            <main className='min-h-screen mt-28 py-8 flex md:flex-row flex-col-reverse mx-6 md:mx-10 md:space-x-4'>
                <div className='flex-1'>
                    <h1 className=' text-xl mb-4 bg-gray-100 px-10  py-6 rounded-md font-bold '> ALL ITEMS ({products.length})</h1>
                    {products.length === 0 
                        ? 
                            <div className=' bg-gray-100 px-16   flex justify-center flex-col min-h-screen rounded-md'>
                                <Empty />
                                <h1 className='text-xl text-center mt-4 mb-1 font-bold'>YOUR CART IS EMPTY</h1>
                                {!userId &&
                                    <>
                                        <p className='text-center opacity-80'> Connectez-vous pour voir votre panier et commencer vos achats. </p>
                                        <button onClick={OpenAuth} className='mt-6 w-fit mx-auto text-lg bg-blue-500 text-white rounded-md px-14 py-2 hover:scale-105 transition-all'> Sign In  /  Register </button>
                                    </>
                                }
                            </div>
                        :
                            <ProductsPanier />
                    }
                </div>
                <OrderSummery Orderdata={null} page={"panier"}/>
            </main>
        
            <Footer />
        </>
  )
}

export default Panier