import React from 'react'
import { NavbarContainer } from './ui/ContainerProps'
import Image from 'next/image'
import { NavLi } from './ui/NavLiProps';
import TableIcon from './ui/TableIcon';
import QuestionIcon from './ui/QuestionIcon';
import PhotoIcon from './ui/PhotoIcon';
import FileIcon from './ui/FileIcon';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  isOpen: boolean;
}

const Navbar = ({isOpen}: NavbarProps) => {
  const currentRoute = usePathname();
  
  return (
    <NavbarContainer isOpen={isOpen}>
      {!isOpen && <Image className='w-full text-clip mt-[50px] mb-[25px]' src="/logo.svg" alt="Logo" width={100} height={100} priority /> }
        <ul className='mt-[50px]'>
          <NavLi isActive={currentRoute === '/intro'} >
            <a className='flex justify-end items-center' href="/intro">
              Nõuded
            <QuestionIcon className="text-twnTextColor group-hover:text-twnLinkHoverColor w-[22px] h-[22px] ml-[10px]"/>
            </a>
          </NavLi>
          <NavLi isActive={currentRoute === '/article'}>
            <a className='flex justify-end items-center' href="/article">Artikkel
            <FileIcon className="text-twnTextColor group-hover:text-twnLinkHoverColor w-[22px] h-[22px] ml-[10px]"/>
            </a>
          </NavLi>
          <NavLi isActive={currentRoute === '/list'}>
            <a className='flex justify-end items-center' href="/list">Tabel 
            <TableIcon className="text-twnTextColor group-hover:text-twnLinkHoverColor w-[22px] h-[22px] ml-[10px]"/>
            </a>
          </NavLi>
          <NavLi isActive={currentRoute === '/life'}>
            <a className='flex justify-end items-center' href="/life">Game of Life
            <PhotoIcon className="text-twnTextColor group-hover:text-twnLinkHoverColor w-[22px] h-[22px] ml-[10px]"/>
            </a>
          </NavLi>
        </ul>
    </NavbarContainer>
  )
}

export default Navbar