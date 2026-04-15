import React from 'react'
import { Link } from 'react-router-dom'
import { GetCategories } from '../../../Components/Functions'
import { CategorieSkeletonList } from '../../../Components/Skeletons'

function Categories() {
    let data = GetCategories()
    
    return (
        <div className='mt-28'>
            <h1 className='text-center font-medium text-3xl'> Popular Categories </h1>
            <div className=' overflow-x-scroll flex md:justify-center mt-10 px-6 md:px-20 space-x-10 py-6 '>
                {data?.length === 0
                    ? 
                        <CategorieSkeletonList />
                    :
                        data?.map((item,key)=>(
                            <Link className='transition-all hover:scale-110' key={key} to={`/categorie/${item.titre.toLowerCase()}`}>
                                <div className='w-32 h-32 rounded-full overflow-hidden hover:shadow-lg' key={key}>
                                    <img src={item.image} className='w-full' alt='' />
                                </div>
                                <h1 className='text-center mt-3 font-medium '> {item.titre}</h1>
                            </Link>
                        ))
                } 
            </div>
        </div>
    )
}

export default Categories