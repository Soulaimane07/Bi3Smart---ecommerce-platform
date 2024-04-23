import React from 'react'
import Navadmin from '../../../Components/Navbar/Navadmin'
import Sidebar from '../../../Components/Navbar/Sidebar'
import Seller from './Seller'
import Footer from '../../../Components/Footer/Footer'

function ReadSeller() {
  return (
    <>
    <Navadmin />
    
    <main className='min-h-screen mt-28 flex items-start'>
    <Sidebar />
    <Seller />
        </main>
    <Footer />
    </>
  )
}

export default ReadSeller