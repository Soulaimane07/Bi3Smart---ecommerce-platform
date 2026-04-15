import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import SearchZone from './SearchZone'
import { useDispatch, useSelector } from 'react-redux'
import { searchActions } from '../../redux/Slices/SearchSlice'

function Search() {
    const dispatch = useDispatch()
    let openedSearch = useSelector(state => state.Search.opened)

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(()=> {
        // Define a debounce function
        const debounceSearch = setTimeout(() => {
            dispatch(searchActions.search(searchTerm));
        }, 200); // Adjust debounce delay as needed

        // Clear the timeout on component unmount or when searchTerm changes
        return () => clearTimeout(debounceSearch);
    }, [searchTerm, dispatch])

    return (
        <div className='absolute hidden left-0 right-0 mx-auto md:flex space-x-3 items-center  bg-gray-200 rounded-full w-1/3 px-4 py-1'>
            <div className='text-gray-400'>
                <CiSearch size={24} />
            </div>
            <input
                className='bg-transparent w-full outline-none py-1 placeholder:text-gray-400' 
                placeholder='Search for products' 
                onChange={(e)=> setSearchTerm(e.target.value)}
            />
            {openedSearch && <SearchZone />}
        </div>
    )
}

export default Search
