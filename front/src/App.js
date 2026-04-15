import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Auth from './Components/Auth/Auth';
import Clients from './Interfaces/Clients';
import Seller from './Interfaces/Seller';
import Admin from './Interfaces/Admin';
import { useEffect } from 'react';
import { UserActions } from './redux/Slices/UserSlice';
import  Product  from './Pages/Client/Products/Product';
import { favoritsActions, getFavorits } from './redux/Slices/FavoritsSlice';
import { getPanier, panierActions } from './redux/Slices/PanierSlices';
import { GetTopButton } from './Components/Buttons';
 
function App() { 
  let productPage = useSelector(state => state.ProductPage.opened)
  let authPage = useSelector(state => state.authPage.opened)
  const dispatch = useDispatch()
 
  useEffect(()=> {
    let userStrorage = localStorage.getItem('bi3smart_user')
    let user = JSON.parse(userStrorage)    

    if(user) {
      dispatch(UserActions.login(user))
      dispatch(getFavorits(user?.id))
      dispatch(getPanier(user?.id))
    } else {
      dispatch(UserActions.logout())
      dispatch(favoritsActions.emptyFavorites())
      dispatch(panierActions.emptyPanier())
    }
  }, [dispatch])


  return (
    <BrowserRouter>
      <Clients />
      <Seller />
      <Admin />

      <GetTopButton />

      {authPage && <Auth />}
      {productPage && <Product />}
    </BrowserRouter>
  );
}

export default App;
