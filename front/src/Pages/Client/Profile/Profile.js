import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import MyInformayion from './MyInformayion'
import { BaseUrl, TopPage } from '../../../Components/Functions'
import Commandes from './Commandes'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Profile() {
    TopPage()

    const user = useSelector(state => state.User?.data)

    const [commandes, setCommandes] = useState([])

    useEffect(()=> {
        axios.get(`${BaseUrl}/payment/commandes/${user?.id}/`)
            .then((res)=> {
                console.log(res.data);
                setCommandes(res.data)
            })
            .catch((err)=>{
                console.error(err);
            })
    }, [user])



    const [component, setComponent] = useState(0)

    const list = [
        {
            "title":"Profile",
            "component": <MyInformayion />
        },
        {
            "title":"Commandes",
            "component": <Commandes commandes={commandes} />
        }
    ]



    

  return (
    <>
        <Navbar />

        <main className='min-h-screen mt-24 md:mt-32 flex flex-col md:flex-row px-6 md:px-20 pt-10'>
            <div className="md:w-80 flex flex-row md:flex-col">
                {list.map((item,key)=>(
                    <button onClick={()=> setComponent(key)} key={key} className={`${component === key && 'text-blue-500 border-2 border-b-blue-500 md:border-b-transparent md:border-r-blue-500 '} hover:text-blue-500 flex justify-between items-center hover:border-b-blue-500 md:hover:border-b-transparent md:hover:border-r-blue-500  border-2 border-transparent rounded-sm transition-all w-full py-4 text-left px-4`}> 
                        <p>{item.title} </p>
                        {key === 1 && <p className='bg-blue-100 px-2 text-sm rounded-full'>{commandes?.length}</p>}
                    </button>
                ))}
            </div>

            <section className=' w-full px-4 md:px-0 md:pl-10 mt-10 md:mt-0'>
                {list[component].component}
            </section>
        </main>

        <Footer />
    </>
  )
}

export default Profile