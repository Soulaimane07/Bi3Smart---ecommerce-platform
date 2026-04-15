import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ProdcutSearch } from '../Product/Product';
import axios from 'axios';
import { ProductsSearchSkeletonList } from '../Skeletons';
import { BaseUrl } from '../Functions';

function SearchZone() {
    let searchTerm = useSelector(state => state.Search.data)
    
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get(`${BaseUrl}/api/searchproducts/${searchTerm}/`)
            .then((res)=> {
                setProducts(res.data)
                console.log(res.data)
            })
            .catch((err)=> {
                console.error(err);
            })
    }, [searchTerm])
        

  return (
    <div className='Search z-10 absolute overflow-y-scroll bg-gray-200 px-2 py-2 right-0 top-0 mt-11 w-full max-h-96 rounded-md'>
        <ul className='flex flex-col space-y-2'>
            {products?.length === 0
            ?
                <ProductsSearchSkeletonList />
            :
                products?.map((item,key)=>(
                    <ProdcutSearch item={item} key={key} />
                ))
            }
        </ul>
    </div>
  )
}

export default SearchZone