import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Client/Home/Home';
import Favorits from '../Pages/Client/Favorits/Favorits';
import Panier from '../Pages/Client/Panier/Panier';
import { Categories } from '../Pages/Client/Categories/Categories';
import Layout from '../Components/Layout';
import Profile from '../Pages/Client/Profile/Profile';

function Clients() {
    
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categorie/:categorie" element={<Categories />} />
        <Route path="favorits"  element={<Favorits/>}/>
        <Route path="panier" element={<Panier />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default Clients
