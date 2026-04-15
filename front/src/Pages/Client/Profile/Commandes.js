import React from 'react'
import { apiUrl } from '../../../Components/Functions';

function Commandes({commandes}) {
  return (
    <div className='mx-auto  flex flex-col space-y-3'>
        {commandes?.map((item,key)=>(
            <div key={key} className='flex items-start bg-gray-100 p-2 rounded-sm space-x-4'>
                <img className='w-48 rounded-sm' src={`${apiUrl}${item.productId.image}`} />
                <div className=''>
                    <span class="bg-blue-100 mb-4 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded  border-blue-400"> Commande {item.commandeId.id} </span>
                    <h1 className='text-lg mt-4 font-medium'> {item.productId.titre} </h1>
                    <div className='flex flex-row items-center space-x-4 font-normal'>
                        <div>
                            <h1> Quantite </h1>
                            <h1> Prix </h1>
                            <h1 className=' font-medium'> Total </h1>
                        </div>
                        <div>
                            <h1> {item.quantite} </h1>
                            <h1> $ {item.productId.prix} </h1>
                            <h1 className=' font-medium'> $ {item.productId.prix*item.quantite} </h1>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Commandes