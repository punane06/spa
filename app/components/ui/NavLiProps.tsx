import React from 'react';

interface NavLiProps {
    children: React.ReactNode;
    className?: string;
    isActive?: boolean;
}

export const NavLi = ({children, className, isActive}: NavLiProps) => {
    return (
        <li className={` -mr-[20px] py-[11.2px] px-4 transition-duration-250 transition-transform origin-right hover:text-linkHoverColor hover:scale-105 ${isActive && 'transition-duration-250 transition-transform origin-right text-linkHoverColor scale-105'} ${className || ''}`}>
            {children}
        </li>
    );
}; 