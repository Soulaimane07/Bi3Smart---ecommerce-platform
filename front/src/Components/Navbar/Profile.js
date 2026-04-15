import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../redux/Slices/UserSlice';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { favoritsActions } from '../../redux/Slices/FavoritsSlice';
import { panierActions } from '../../redux/Slices/PanierSlices';
import { BaseUrl } from '../Functions';


function Profile({close}) {
    let request = useSelector(state => state.User.requestSeller)
    let user = useSelector(state => state.User.data)

    const dispatch = useDispatch()
    
    const logout = () => {
        dispatch(UserActions.logout())
        dispatch(favoritsActions.emptyFavorites())
        dispatch(panierActions.emptyPanier())
        close(false)
    }

    const RequestSeller = () => {
        fetch(`${BaseUrl}/api/sellerrequests/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: user?.id, status: false}),
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(UserActions.sellerRequest())
            })
            .catch((error) => console.log(error));
    }

    let path = '/profile'
    user.role === 'admin' && (path = '/admin/dashboard')
    user.role === 'seller' && (path = '/seller/dashboard')
    
    return (
        <div className='ProfileBox w-full bg-gray-100 px-6 py-4 absolute left-0 md:left-auto md:right-20 top-20 md:w-72 rounded-md'>
            {user &&
                <>
                    <button onClick={()=> close(false)} className='absolute top-4 right-4 hover:scale-110 transition-all'><IoCloseOutline size={26} /></button>
                        <div className='flex-1 h-full'>
                            <h1 className='text-center mb-4'> {user.email} </h1>
                            <Link to={path}>
                                <div className='profileBtn transition-all p-4 bg-blue-200 rounded-full w-fit mx-auto mb-2'>
                                    <div style={{ backgroundImage: `url(../images/user.png)` }} className='w-11 h-11 ImageBG'>
                                    </div>
                                </div>
                            </Link>
                            <h2 className='text-center'> Hi, {user.fname} ! </h2>
                        </div>
                    <button onClick={logout} className='bg-blue-500 text-white hover:scale-110 transition-all w-full py-2 rounded-md mt-6'> Log out </button>
                    {user?.role === "client" &&(
                        request
                            ?   <h1 className='flex items-center text-center justify-center mt-4 space-x-2'> <IoMdCheckmarkCircleOutline size={20} /> <p> Requested to become Seller </p> </h1> 
                            :   <button onClick={RequestSeller} className='bg-white text-gray-900 w-full py-2 rounded-md mt-2'> Request to become Seller </button>
                        )
                    }
                </>
            }
        </div>
    )
}

export default Profile