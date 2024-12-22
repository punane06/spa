import React from 'react';

interface TableProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void
}

export const Table = ({children, className}: TableProps) => {
    return (
        <table className={`overflow-x-auto text-sm text-left border-collapse w-full ${className || ''}`}>
            {children}
        </table>
    );
}; 

export const THead = ({children, className}: TableProps) => {
    return (
        <thead className={`font-bold bg-[#333333] r-2 ${className || ''}`}>
            {children}
        </thead>
    );
}; 

export const TrHead = ({children, className}: TableProps) => {
    return (
        <tr className={`border-b-[.0625rem] border-b-white border-solid ${className || ''}`}>
            {children}
        </tr>
    );
}; 

export const Th = ({children, className, onClick}: TableProps) => {
    return (
        <th className={`py-[6px] px-2 md:py-[10px] md:px-4 ${className || ''}`} onClick={onClick}>
            {children}
        </th>
    );
}; 

export const TrBody = ({children, className}: TableProps) => {
    return (
        <tr className={`border-b-[.0625rem] even:bg-white/10 border-b-white border-solid ${className || ''}`}>
            {children}
        </tr>
    );
}; 

export const Td = ({children, className}: TableProps) => {
    return (
        <td className={`py-[6px] px-2 md:py-[10px] md:px-4 whitespace-nowrap ${className || ''}`}>
            {children}
        </td>
    );
}; 