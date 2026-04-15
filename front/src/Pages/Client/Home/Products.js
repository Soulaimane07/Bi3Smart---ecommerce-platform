import { useDispatch, useSelector } from 'react-redux'
import {Product} from '../../../Components/Product/Product'
import { getProducts } from '../../../redux/Slices/ProductSlice'
import { useEffect } from 'react'
import { ProductSkeletonList } from '../../../Components/Skeletons'

function Products() {
  const dispatch = useDispatch()
  
  useEffect(()=> {
    dispatch(getProducts())
  }, [dispatch])

  const products = useSelector(state => state.ProductPage.products)

  return (
    <div className='mt-28'>
        <h1 className='text-center font-medium text-3xl'> Trending Products </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-12 px-6 md:px-40 mb-16 mt-10">
            {products?.length === 0 ?
                <ProductSkeletonList />
              :
                products?.map((item,key)=>(
                    <Product item={item} key={key} />
                ))
            }
        </div>
    </div>
  )
}

export default Products