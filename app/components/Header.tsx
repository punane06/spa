'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface HeaderProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

const Header = ({isOpen, toggleNavbar}: HeaderProps) => {

  return (
    <div className='bg-white z-50 md:hidden visible h-[50px] top-0 left-0 w-full flex flex-row fixed py-[10px] px-5'>
      <button onClick={toggleNavbar}>
        {
          isOpen ?
            <Image className='h-full my-0 mx-0 text-clip' src="/close.svg" alt="BG-left" width={20} height={100} priority />
         :
            <Image className='h-full my-0 mx-0 text-clip' src="/burger.svg" alt="BG-left" width={20} height={100} priority />
        }
      </button>
      <Image className='h-full my-0 mx-auto text-clip' src="/logo.svg" alt="Logo" width={150} height={250} priority /> 
    </div>
  )
}

export default Header