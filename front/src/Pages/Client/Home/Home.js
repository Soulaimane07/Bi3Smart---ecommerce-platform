import React from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import Header from './Header'
import Features from './Features'
import Categories from './Categories'
import Products from './Products'
import Subscribe from './Subscribe'
import { TopPage } from '../../../Components/Functions'

function Home() {
  TopPage()
  
  return (
    <>
        <Navbar />

        <main className='min-h-screen mt-24 md:mt-28 w-full overflow-hidden'>
            <Header />
            <Features />
            <Categories />
            <Products />
            <Subscribe />
        </main>

        <Footer />
    </>
  )
}

export default Home