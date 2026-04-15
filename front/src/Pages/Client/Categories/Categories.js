import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import {Product} from '../../../Components/Product/Product'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductsByCategorie } from '../../../redux/Slices/ProductSlice'
import { ProductSkeletonList } from '../../../Components/Skeletons'
import axios from 'axios'
import Empty from '../../../Components/Empty'
import { BaseUrl, TopPage } from '../../../Components/Functions'


export const Categories = () => {
  TopPage()

  const dispatch = useDispatch()
  let parametre=useParams()
  let categorie = parametre.categorie
  
  useEffect(()=> {
    axios.get(`${BaseUrl}/api/categorie/${categorie}`)
      .then((res)=> {
        res.data.id && dispatch(getProductsByCategorie(res.data.id))  
      })
      .catch((err)=> {
        console.log(err);
      })
  }, [categorie, dispatch])

  let list = useSelector(state => state.ProductPage.productsByCategorie)
  let isLoading = useSelector(state => state.ProductPage.isLoadingPC)

  return (
    <>
    <Navbar />
    <main className={` min-h-screen mt-28 flex items-start`}>
        {/* <Filtrage /> */}

        <div className='w-full border-l-2 border-gray-100 min-h-svh'>
            <h1 className=' text-3xl text-center font-medium px-10 mt-4 py-8 rounded-md uppercase'> {categorie} </h1>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-2 px-6 md:px-20 flex-1'>
              {isLoading && <ProductSkeletonList />}
              {list?.length !== 0 &&
                  list?.map((item,key)=>
                    <Product item={item} key={key} />
                  )}
            </div>
            {list?.length === 0 && <div className='mt-14'> <Empty /> </div>}
        </div>
    </main>
    <Footer />
    </>
  )
}
