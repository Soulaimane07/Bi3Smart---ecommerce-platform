import React from 'react'
import Languages from './Data/Languages.json'

function Language() {
  return (
    <div>
        <h2 className="mb-6  text-sm font-semibold text-gray-900 uppercase dark:text-black">Language</h2>
        <select className='w-full border text-gray-700 dark:text-gray-600 outline-none rounded-md px-1 py-1'>
            <option> {Languages.english.title} </option>
            <option> {Languages.frensh.title} </option>
            <option> {Languages.arabic.title} </option>
        </select>
    </div>
  )
}

export default Language