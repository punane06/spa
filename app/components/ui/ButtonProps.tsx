import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Button = ({children, className, onClick}: ButtonProps) => {
    return (
        <button className={`uppercase inline-block font-booster font-bold mb-4 py-[13.5px] px-[40px] text-[16px] text-backgroundColor hover:bg-[#41e592] bg-[#14cc76] cursor-pointer transition-all duration-250 ease-out border-b-[.25rem] border-solid leading-none border-[#37945C] ${className || ''}`} onClick={onClick}>
            {children}
        </button>
    );
}; 