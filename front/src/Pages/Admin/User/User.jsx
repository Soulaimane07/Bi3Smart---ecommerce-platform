import React from 'react'
import  { useState,useEffect } from 'react'
import { CiTrash } from 'react-icons/ci';
import { BiEditAlt } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { GetUsers,Removeuser,GetSellers, BaseUrl } from '../../../Components/Functions';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();
    const users = GetUsers()
    const sellers = GetSellers()
    
    const Update = (id) => {
         //e.preventDefault();
        console.log("Updated !");
        const newUserData={role:"seller"}
        axios.patch(`${BaseUrl}/api/users/${id}/`, newUserData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(res => {
                console.log(res);
                
            })
            .catch(err => {
                console.log(err);
                console.log(id)
            })
    }
    const [combinedList, setCombinedList] = useState([]);

useEffect(() => {
  const updatedCombinedList = users.map((user) => {
    const correspondingSeller = sellers.find((seller) => seller.userId === user.id);
    return {
      user,
      seller: correspondingSeller || "", 
    };
  });
  setCombinedList(updatedCombinedList);
}, [users, sellers]);
console.log(combinedList)
  return (
    
    <>
     <div className='w-5/6 border-l-2   border-gray-100 min-h-svh'>
     <header className='w-5/6 mb-8 mx-20 justify-between flex text-center'>
                <h1 className='text-2xl font-medium'> Users ({users?.length}) </h1>
                <Link to={"/admin/adduser"} className='flex items-center px-6 border-2 bg-blue-600 text-white border-blue-600 hover:text-blue-700 hover:bg-white transition-all  rounded-sm py-2 space-x-1'> 
                    <IoAdd size={20} />
                    <p> User </p>
                </Link>
            </header>
            
            <div className=' px-20 text-center'>
          

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Id
                </th>
                <th scope="col" class="px-6 py-3">
                    Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                    First Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Role
                </th>
                <th scope="col" class="px-6 py-3">
                    seller request
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {combinedList.map((list,key)=>(<tr  class="bg-white border-b ">
                <th  scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {list.user.id}
                </th>
                <td class="px-6 py-4">
                    {list.user.lname}
                </td>
                <td class="px-6 py-4">
                {list.user.fname}
                </td>
                <td class="px-6 py-4">
                {list.user.email}
                </td>
                <td class="px-6 py-4">
                {list.user.role}
                </td>
                <td class="px-6 py-4">
                {list.seller && list.user.role === 'client'?(<button onClick={()=>Update(list.user.id)}  className='px-6 border-2 bg-green-500 text-white border-green-500 hover:text-green-600 hover:bg-white transition-all  rounded-sm py-2 space-x-1 '>Accept</button>):'-'}
                </td>
                <td class="px-6 py-4 ">
                <Link to={`/admin/edituser/${list.user.id}` }>
                <button  className=' opacity-40 hover:opacity-100 hover:text-blue-600 transition-all mr-4 '>
                    <BiEditAlt size={25} />
                </button>
                </Link>
                <button onClick={()=>Removeuser(list.user.id)}  className=' opacity-40 hover:opacity-100 hover:text-red-600 transition-all '>
                    <CiTrash size={25} />
                </button>
                </td>
                
            </tr>))}
            
        </tbody>
    </table>
</div>

            </div>
        </div>
    </>
    
  )
}

export default User