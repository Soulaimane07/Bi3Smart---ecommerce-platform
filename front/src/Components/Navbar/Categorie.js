import { NavLink } from 'react-router-dom'
import { GetCategories } from '../Functions';

function Categorie() {
    const data = GetCategories()

  return (
    <nav className='Scroll overflow-x-scroll relative mt-2 flex flex-row md:justify-center space-x-1 min-h-10'>
      {data?.map((item,key)=>(
          <NavLink 
            key={key}
            to={`/categorie/${item.titre?.toLowerCase()}`} 
            className={({ isActive }) =>
              isActive ? "text-sm md:text-base px-5 md:px-8 py-1.5 hover:bg-blue-400 transition-all text-white bg-blue-500" : "text-sm md:text-base px-5 md:px-8 py-1.5 rounded-sm hover:bg-blue-400 hover:text-white transition-all"
            }  
          >
              {item.titre}
          </NavLink>
      ))}
    </nav>
  )
}

export default Categorie