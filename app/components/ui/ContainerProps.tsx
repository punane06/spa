import React from 'react';
import Image from 'next/image';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    isOpen?: boolean;
}

export const MainContainer = ({children, className}: ContainerProps) => {
    return (
        <main className={`w-full h-screen overflow-auto md:ml-[220px] md:py-20 md:px-10 pt-[120px] px-6 relative md:pt-[120px] mb-30  flex ${className || ''}`}>
            <Image className='fixed md:ml-[220px] ml-0 -z-10 bottom-0 left-0 object-cover' src="/bg-deco-left.svg" alt="BG-left" width={150} height={250} priority />
            <Image className='fixed -z-10 top-0 right-0 object-cover' src="/bg-deco-right.svg" alt="BG-right" width={250} height={150} priority />
            {children}
        </main>
    );
}; 

export const IntroContainer = ({children, className}: ContainerProps) => {
    return (
        <div className={`flex w-full flex-col md:mt-0 -mt-42 items-center align-center justify-center text-center ${className || ''}`}>{children}</div>
    );
}; 

export const NavbarContainer = ({children, className, isOpen}: ContainerProps) => {
    return (
        <div className={`w-[220px] p-[25px] text-right uppercase text-textColor  top-0 left-0 text-base md:text-[19px] overflow-auto z-40 bg-white fixed h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${className || ''}`}>{children}</div>
    );
}; 

export const ContentContainer = ({children, className}: ContainerProps) => {
    return (
        <div className={`w-full max-w-[1000px] h-full mx-auto mb-20 ${className || ''}`}>{children}</div>
    );
}; 