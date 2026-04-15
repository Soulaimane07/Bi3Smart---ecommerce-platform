import React from 'react'
import { useDispatch } from 'react-redux';
import { authPageActions } from '../../../redux/Slices/AuthSlice';

function Subscribe() {
  const dispatch = useDispatch()
  const OpenAuth = () => {
      dispatch(authPageActions.open())
  }

  return (
    <div style={{ backgroundImage: `url(../images/header.jpg)` }} className='Header mt-28 overflow-hidden flex flex-col justify-center space-y-2 text-white px-6 md:px-20'>
        <h1 className='text-xl md:text-4xl font-medium'> Get Your Latest Update ! </h1>
        <h1 className='text-xl md:text-4xl pb-2 font-medium'> Up to 40% off on all items. </h1>
        <p className='pb-6 md:text-lg'> Subscribe to our latest newsletter to get zbout special discounts. </p>
        <button 
          onClick={OpenAuth}
          className='text-gray-800 text-sm md:text-base font-medium bg-white w-fit px-14 rounded-lg py-2'
        > Sign In </button>
    </div>
  )
}

export default Subscribe