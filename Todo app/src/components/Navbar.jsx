import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-950 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-x1 mx-8'>Daily-Task !</span>
      </div>
        <ul className="flex gap-8 mx-9">
            <li className='hover:cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='hover:cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
