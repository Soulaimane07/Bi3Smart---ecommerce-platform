import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserActions } from '../../../redux/Slices/UserSlice'
import { IoAlertCircleOutline, IoClose } from 'react-icons/io5'
import { BaseUrl } from '../../../Components/Functions'

function MyInformayion() {
    const user = useSelector(state => state.User?.data)

    const [email, setEmail] = useState(user?.email)
    const [fname, setFname] = useState(user?.fname)
    const [lname, setLname] = useState(user?.lname)
    const [password, setPassword] = useState("")

    let condition = email === user?.email && fname === user?.fname && lname === user?.lname && password === "" || email?.length === 0 || fname?.length === 0 || lname?.length === 0

    let data = {
        email,
        fname, 
        lname
    }

    password && (data["password"] = password)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const Update = (e) => {
        e.preventDefault();
        setLoading(true)

        axios.patch(`${BaseUrl}/api/users/${user?.id}/`, data)
            .then((res)=> {
                console.log(res.data);
                setSuccess(true)
                setLoading(false)
                dispatch(UserActions.login(res.data))
                setTimeout(() => {
                    setSuccess(false)
                }, 2000);
            }) 
            .catch((err)=> {
                setLoading(false)
                console.log(err);
            })
    }

    const Close = () => {
        setSuccess(false)
    }

  return (
    <form onSubmit={Update} className=' mx-auto w-full md:w-1/2 '>
        {success && 
            <div className=' bg-green-500 text-white border border-spacing-2 justify-between w-full mb-4 transition-all px-4 pr-2 py-2 rounded-sm border-green-500 flex space-x-2 items-center '>
                <div className='flex items-center space-x-2'>
                    <IoAlertCircleOutline size={20} />
                    <p className=''> Your profile has been updated successfully. </p>
                </div>
                <button onClick={Close} className='hover:bg-green-400 transition-all p-2 rounded-md'>
                    <IoClose size={20} />
                </button>
            </div>
        }

        <div className='flex flex-col space-y-3 mx-auto'> 
            <div className='flex flex-col space-y-2'>
                <label> Email </label>
                <input onChange={(e)=> setEmail(e.target.value)} className='border-b-2 outline-none px-4 py-2' type='email' defaultValue={email} placeholder='Email' />
            </div>
            <div className='flex flex-col space-y-2'>
                <label> First Name </label>
                <input onChange={(e)=> setFname(e.target.value)} className='border-b-2 outline-none px-4 py-2' type='text' defaultValue={fname} placeholder='First name' />
            </div>
            <div className='flex flex-col space-y-2'>
                <label> Last Name </label>
                <input onChange={(e)=> setLname(e.target.value)} className='border-b-2 outline-none px-4 py-2' type='text' defaultValue={lname} placeholder='Last name' />
            </div>
            <div className='flex flex-col space-y-2'>
                <label> Password </label>
                <input onChange={(e)=> setPassword(e.target.value)} className='border-b-2 outline-none px-4 py-2' type='password'  placeholder='Password' />
            </div>
        </div>


        <button 
                disabled={condition}
                className={ `${condition ? "opacity-40" : "hover:scale-105"} flex justify-center bg-blue-500 text-white w-full py-2 text-center mt-6 rounded-sm transition-all`}
            > 
                {loading 
                    ? 
                        <div role="status">
                            <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    : 
                        <p> Update </p>
                }
        </button>
    </form>
  )
}

export default MyInformayion