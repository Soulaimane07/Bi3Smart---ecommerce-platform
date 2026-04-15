import React from 'react'

function Header() {
  return (
    <header style={{ backgroundImage: `url(../images/header1.jpg)` }} className='Header overflow-hidden flex flex-col justify-center space-y-2 text-white px-10 md:px-20'>
        <h1 className='text-2xl'> BEST OF THE BEST </h1>
        <p className='text-4xl md:text-6xl'> Gold Earring For <br></br> Women </p>
    </header>
  )
}

export default Header