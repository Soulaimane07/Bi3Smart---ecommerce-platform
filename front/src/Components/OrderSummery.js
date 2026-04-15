import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import { BaseUrl } from './Functions';

function OrderSummery({page, Orderdata}) {
    let price = useSelector(state => state.Panier.price); 
    let productsSelected=useSelector((state)=>state.Panier.productsSelected)
    let products=useSelector((state)=>state.Panier.products)
    const condition = Orderdata?.fname ==="" || Orderdata?.lname ==="" || Orderdata?.tel ==="" || Orderdata?.add ==="" ||Orderdata?.paiment === null || Orderdata?.products?.length === 0

    let image =[
      '../images/visa.svg',
      '../images/discover.svg',
      '../images/maestro.svg',
      '../images/mastercard.svg',
      '../images/paypal.svg',
      '../images/venmo.svg',
   ]

    const [navbar, setNavbar] = useState(false)
    const [y, setY] = useState(0)

    const changebg = () => {
        if(window.scrollY !== 0){
            setNavbar(true);
        } else {
            setNavbar(false)
        }

        if(window.scrollY < y){
            setNavbar(false)
        }
        setY(window.scrollY)
    }

    window.addEventListener('scroll',changebg)






    const [loading, setLoading] = useState(false)

    const Commander = async () => {
      setLoading(true)

      let productsDetails = []
  
        productsSelected?.map((item)=>(
          productsDetails = [...products?.filter((itemm)=> itemm.id === item), ...productsDetails]
        ))
        

      const stripe = await loadStripe("pk_test_51PC4svCTx4GzaOVoTMOKKaZfg7nX0Vm548xLg8vW82EibDbPsMS1Wp3lfwcdz0t6fmYGNdWxnku9wiJy3o7XXuZD00dRswdDvl")
      const body = productsDetails
      const headers = {"Content-Type": "application/json"}
      
      const response = await fetch(`${BaseUrl}/payment/checkout/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })

      !response.ok && setLoading(false)
      


      const session = await response.json()

      const result = stripe.redirectToCheckout({
        sessionId: session.id
      })

      if(result.error){
        console.log(result.error);
        setLoading(false)
      }
    }
    

  return (
    <div className={`${navbar ? 'top-6' : 'top-36'} transition-all w-full md:w-96 md:mb-0 mb-10 right-0 md:sticky`}>
    <div className='bg-gray-100 py-6 px-6 mb-4 rounded-md'>
      <div>
        <h1 className='text-2xl mb-2 font-bold'>Order Summary</h1>
        <h2 className='text-2xl'>${price}</h2>
        {page === "panier" &&(
            <button onClick={Commander} className={`bg-blue-500 flex justify-center text-white w-full py-2 text-center mt-6 rounded-lg  ${productsSelected?.length === 0 ? 'opacity-40 cursor-default':'opacity-100  hover:scale-105 transition-all'} `}>
                {!loading 
                  ? <p> Checkout Now ({productsSelected.length})</p>
                  :
                    <div role="status">
                        <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
            </button>
        )}
        {page === "commande" &&(
            <button disabled={condition} className={ `${condition ? "opacity-40" : "hover:scale-105"} bg-blue-500 text-white w-full py-2 text-center mt-6 rounded-lg transition-all`}> 
              Order Now 
            </button>
        )}
      </div>
    </div>
    <div className=' bg-gray-100 px-6 py-4 rounded-md'> 
        <h1 className='mb-4 font-bold text-lg'>We Accept</h1>
        <div className=' grid grid-cols-6 items-stretch'>
            {image.map((item,key)=>(
                <img key={key} src={item} alt='' className='w-10 h-10 overflow-hidden ' />
            ))}
        </div>
    </div>
    </div>
  )
}

export default OrderSummery


