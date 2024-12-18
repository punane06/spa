import React from 'react'
import { NavbarContainer } from './ui/ContainerProps'

interface NavbarProps {
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({isOpen}) => {
  return (
    <NavbarContainer>
        {isOpen && (<ul className='bg-red-500 pt-10'>
          <li>
            <a href="/intro">Nõuded</a>
          </li>
          <li>
            <a href="/article">Artikkel</a>
          </li>
          <li>
            <a href="/list">Tabel</a>
          </li>
          <li>
            <a href="/life">Game of Life</a>
          </li>
        </ul>)}
    </NavbarContainer>
  )
}

export default Navbar