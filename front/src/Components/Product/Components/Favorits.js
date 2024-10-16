import axios from 'axios';
import React from 'react'
import { FaHeart, FaPlus } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { authPageActions } from '../../../redux/Slices/AuthSlice';
import { getProducts, getProductsByCategorie } from '../../../redux/Slices/ProductSlice';
import { getFavorits } from '../../../redux/Slices/FavoritsSlice';

function Favorits({item, hover, setHover, favorit}) {
    const dispatch = useDispatch()
    let userId= useSelector(state => state.User.data?.id)

    const AddToFav = () => {
        if(userId === undefined){
            dispatch(authPageActions.open())
        }else{
            let fav = {
                userId: userId,
                productId: item.id
            }
        
<<<<<<< HEAD
            axios.post('https://d23i3x5oooaihp.cloudfront.net/api/favoris/', fav)
=======
            axios.post('http://15.237.160.116:8000/api/favoris/', fav)
>>>>>>> 487402f88bb91c5e6afa682365d3be4e9d657a43
                .then((res)=> {
                    dispatch(getFavorits(userId))
                    dispatch(getProducts())
                    dispatch(getProductsByCategorie(item.categorie))
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    }

    const RemoveFromeFav = () => {
        if(userId === undefined){
            dispatch(authPageActions.open())
        }else{
            let fav = {
                userId: userId,
                productId: item.id
            }
        
<<<<<<< HEAD
            axios.post('https://d23i3x5oooaihp.cloudfront.net/api/removefavoris/', fav)
=======
            axios.post('http://15.237.160.116:8000/api/removefavoris/', fav)
>>>>>>> 487402f88bb91c5e6afa682365d3be4e9d657a43
                .then((res)=> {
                    dispatch(getFavorits(userId))
                    dispatch(getProducts())
                    dispatch(getProductsByCategorie(item.categorie))
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    }


    return (
        favorit ? (
            <button 
                onClick={RemoveFromeFav} 
                onMouseEnter={()=> setHover(true)} 
                onMouseLeave={()=> setHover(false)}
                title='Remove product from your Wish List' 
                className=' absolute top-1 left-1 transition-all text-black bg-white opacity-80 hover:opacity-100 px-2 rounded-full'
            > 
                {hover 
                    ?
                    <div className='px-3 py-1 text-gray-800'>
                        <GoTrash size={12}  />
                    </div>
                    :
                    <div className='flex items-center space-x-2'>
                        <p className=' text-sm'> {item.fav} </p> 
                        <FaHeart color="red" size={14}/> 
                    </div>
                }
            </button>
        )
        :   ( 
            <button 
                onClick={()=> AddToFav(item)} 
                onMouseEnter={()=> setHover(true)} 
                onMouseLeave={()=> setHover(false)}
                title='Add product to your Wish List' 
                className=' absolute top-1 left-1 transition-all text-black bg-white opacity-80 hover:opacity-100 px-2 rounded-full'
            > 
                {hover 
                    ?
                        <div className='px-3 py-1 text-gray-800'>
                            <FaPlus size={12}  />
                        </div>
                    :
                        <div className='flex items-center space-x-2'>
                            <p className=' text-sm'> {item.fav} </p> 
                            <FaHeart color="red" size={14}/> 
                        </div>
                }
            </button>
        )
    )
}

export default Favorits