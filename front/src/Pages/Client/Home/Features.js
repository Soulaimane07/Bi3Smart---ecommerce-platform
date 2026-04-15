import React from 'react'

function Features() {
    const data = [
        {
            "title": "Free Shipping",
            "desc":"On order over $100",
            "image": "../images/send.png",
        },
        {
            "title": "30 Day Returns",
            "desc":"Back returns in 7 days",
            "image": "../images/cashback.png",
        },
        {
            "title": "Money Guarantee",
            "desc":"Cach on Delevery",
            "image": "../images/wallet.png",
        },
        {
            "title": "Online Support",
            "desc":"Call Us 24/7",
            "image": "../images/headset.png",
        },
    ]

  return (
    <div className='md:flex md:justify-center md:space-x-32 mt-20 grid-cols-2 grid gap-8 px-4 md:px-0'>
        {data.map((item,key)=>(
            <div key={key} className='md:flex items-center space-x-4'>
                <img src={item.image} alt={`feature ${key}`} className='w-10 mx-auto md:w-16 opacity-90 mb-4 md:mb-0' />

                <div>
                    <h1 className=' md:text-xl font-medium'> {item.title} </h1>
                    <p className='text-xs md:text-sm opacity-80 mt-1'> {item.desc} </p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Features