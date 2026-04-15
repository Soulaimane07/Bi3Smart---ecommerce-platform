import React from 'react'
import { Link } from 'react-router-dom'

import { FaFacebookF, FaWhatsapp, FaInstagram  } from "react-icons/fa";

import Language from '../Language';

function Footer() {
    let date = new Date().getFullYear()
    
    const socials = [
        {
            "link": "https://www.facebook.com/",
            "title": "Facebook",
            "icon": <FaFacebookF size={20} />
        },
        {
            "link": "https://www.instagram.com/",
            "title": "Instagram",
            "icon": <FaInstagram size={20} />
        },
        {
            "link": "https://web.whatsapp.com/",
            "title": "Whatsapp",
            "icon": <FaWhatsapp size={20} />
        }
    ]

  return (
        <footer className="bg-white mt-10">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <Link to={'/'} className="mb-6 md:mb-0">
                       <img src="../../images/logoblack.png" alt='logo' className='w-20 md:w-24' />
                    </Link>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-20 mt-8 md:mt-0">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-600 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline  hover:text-blue-400">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline  hover:text-blue-400">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                        <Language />
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-500">© {date} . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-8">
                        {socials.map((item,key)=>(
                            <Link key={key} target='blank' to={item.link} title={item.title} className="text-gray-500 hover:text-gray-900 dark:hover:text-dark">
                                {item.icon}
                                <span className="sr-only"> {item.title} </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer