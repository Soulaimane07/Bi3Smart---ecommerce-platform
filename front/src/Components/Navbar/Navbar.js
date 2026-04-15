import React, { useState } from 'react'
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';

import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { authPageActions } from '../../redux/Slices/AuthSlice';
import Categorie from './Categorie';
import Search from './Search';

function Navbar() {
    const [openProfile, setOpenProfile] = useState(false)

    const dispatch = useDispatch()

    const isUser = useSelector((state)=> state.User.data)

    const openAuth = () => {
        dispatch(authPageActions.open())
        setOpenProfile(false)
    }

    let FavoritesProducts = useSelector((state)=> state.Favorits.products.length)
    let PanierProducts = useSelector((state)=> state.Panier.products.length)



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

  return (
    <header className={`${navbar ? '-top-32' : 'top-0'} -top-32 drop-shadow-md bg-white transition-all fixed overflow-visible w-full  z-30 text-black px-2 md:px-16`}>
        <nav className='relative px-4 pt-4 w-full flex justify-between items-center'>
            <Link to="/"> <img className='h-10 md:h-16' src="../images/logoblack.png" alt="logo" /> </Link>

            <Search />

            <div className='flex items-center space-x-4 md:space-x-6'>
                <Link to={"/favorits"} className='relative top-1'> 
                    <CiHeart className=' size-7' />
                    <i className='absolute -top-1 -right-2 text-white text-xs bg-blue-500 rounded-full p-1.5 py-0.5'> {FavoritesProducts} </i> 
                </Link>

                <Link to="/panier" className='relative top-1'> 
                    <CiShoppingCart className='size-7' /> 
                    <i className='absolute -top-1 -right-2 text-white text-xs bg-blue-500 rounded-full p-1.5 py-0.5'> {PanierProducts} </i> 
                </Link>

                {isUser 
                    ?
                        <button 
                            onClick={()=> setOpenProfile(!openProfile)}
                            className={`${openProfile && 'bg-blue-100'}  hover:bg-blue-200 p-2 rounded-full transition-all`}
                        > <CiUser size={32} /> </button>
                    :   
                        <button
                            className=' text-sm md:text-md border border-gray-500 my-1.5 px-6 py-1 rounded-md hover:bg-blue-500 hover:border-gray-600 hover:text-white transition-all'
                            onClick={openAuth}
                        > Sign In </button>
                }
            </div>
        </nav>

       <Categorie />

        {openProfile && <Profile close={setOpenProfile} />}
    </header>
  )
}

export default Navbar