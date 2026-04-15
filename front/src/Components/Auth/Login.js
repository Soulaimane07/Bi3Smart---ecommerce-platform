import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { authPageActions } from '../../redux/Slices/AuthSlice';
import { UserActions } from '../../redux/Slices/UserSlice';
import { getFavorits } from '../../redux/Slices/FavoritsSlice';
import { getPanier } from '../../redux/Slices/PanierSlices';
import { BaseUrl } from '../Functions';

function Login({setPage}) {
    const dispatch = useDispatch()
    const closeAuth = () => {
        dispatch(authPageActions.close())
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)

    const LoginFun = (e) => {
        e.preventDefault();
        setErr(null)
        dispatch(UserActions.loading())

        fetch(`${BaseUrl}/api/users/login/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password}),
            })
            .then((data) => {
                switch (data?.status) {
                    case 200:
                        closeAuth()
                        return data.json()
                    case 404:
                        setErr(true)
                        break
                    default:
                        setErr(true)
                        break
                }
            })
            .then((data) => {
                data?.isRequested && (dispatch(UserActions.sellerRequest()))
                dispatch(getFavorits(data.id))
                dispatch(getPanier(data.id))
                dispatch(UserActions.login(data))
            })
            .catch((error) => console.log(error));
    }

    let condittion = email === '' || password === ''

  return (
    <div className='relative bg-gray-800 text-white h-fit mx-4 md:mx-0 md:w-1/4 rounded-lg py-10 px-10'>
        <button onClick={closeAuth} className='absolute top-4 right-4 text-white opacity-80 hover:opacity-100 hover:scale-110 transition'> <IoClose size={30} /> </button>
        
        <h1 className='text-center text-3xl mb-6'> Sign In </h1>
        <h2 className='text-red-500 text-center mb-2'> {err && "Email or Password are wrong !"} </h2>
        <form onSubmit={LoginFun}>
            <div className='mb-8'>
                <h1> Email adress </h1>
                <input autoFocus onChange={(e)=> setEmail(e.target.value)} type='email' className='w-full bg-transparent border-b-2 outline-none py-1 px-2 mt-1' />
            </div>
            <div className='mb-8'>
                <h1> Password </h1>
                <input onChange={(e)=> setPassword(e.target.value)} type='password' className='w-full bg-transparent border-b-2 outline-none py-1 px-2 mt-1' />
            </div>

            <button disabled={condittion} type='submit' className={`${condittion ? 'opacity-20' : ' hover:bg-gray-600 hover:text-white'} bg-white text-gray-900 w-full rounded-md py-2  transition-all`}> Sign In </button>
        </form>
        <div className='flex space-x-2 mt-6'>
            <p> Don't have an account? </p>
            <button onClick={()=> setPage(1)} className='hover:text-blue-500 transition-all'> Register Now </button>
        </div>
        <p className='text-xs text-center mt-6 opacity-60'> By continuing, you agree to our Privacy & Cookie Policy and Terms & Conditions. </p>
    </div>
  )
}

export default Login