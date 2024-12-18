import React from 'react';
import Image from 'next/image';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const MainContainer = ({children, className}: ContainerProps) => {
    return (
        <main className={`w-full h-screen md:ml-[220px] -z-20 py-20 px-10 relative md:pt-[120px] pb-20 md:px-6 flex ${className || ''}`}>
            <Image className='absolute -z-10 bottom-0 left-0 object-cover h-auto' src="/bg-deco-left.svg" alt="BG-left" width={150} height={250} priority />
            <Image className='absolute -z-10 top-0 right-0 object-cover h-auto' src="/bg-deco-right.svg" alt="BG-right" width={250} height={150} priority />
            {children}
        </main>
    );
}; 

export const IntroContainer = ({children, className}: ContainerProps) => {
    return (
        <div className={`flex w-full flex-col items-center align-center justify-center text-center ${className || ''}`}>{children}</div>
    );
}; 

export const NavbarContainer = ({children, className}: ContainerProps) => {
    return (
        <div className={`w-[220px] p-[25px] text-right uppercase text-textColor  top-0 left-0 text-base md:text-[19px] overflow-auto z-40 bg-white md:block hidden fixed h-screen ${className || ''}`}>{children}</div>
    );
}; 