import React from 'react';

interface HeadingProps {
    children: React.ReactNode;
    className?: string;
}

export const H1 = ({children, className}: HeadingProps) => {
    return (
        <h1 className={`font-booster font-bold text-[45px] leading-tight  uppercase ${className || ''}`}>{children}</h1>
    );
}; 


export const H2 = ({children, className}: HeadingProps) => {
    return (
        <h2 className={`font-booster flex justify-center text-center font-bold text-[24px] md:text-[36px] text-centers uppercase ${className || ''}`}>{children}</h2>
    );
}; 