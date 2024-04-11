import React from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import Filtrage from "../Products/Filtrage"
import Product from "../../Components/Product/Product"

function Favorits(){
    let list =[1,2,3,4,5,6,7,8,9,10,11,12]
    return (<>
        <Navbar/>
        <main className='min-h-screen mt-28 flex'>
             <Filtrage/>
             <div className="w-full  p-10 grid grid-cols-4 gap-8 border-l-2" >
                {list.map(()=>(
                    <Product/> 
                ))}
                 
                
             </div>
        </main>
        <Footer/>    
    </>)
}
export default Favorits 