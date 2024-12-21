'use client'
import { useEffect, useState } from "react";
import { H1 } from "../components/ui/HeadingProps";
import { ContentContainer } from "../components/ui/ContainerProps";
import { Table, Td, Th, THead, TrBody, TrHead } from '../components/ui/TableProps';
import Image from 'next/image'

interface DataItem {
    id: string;
    firstname: string;
    surname: string;
    sex: string;
    personal_code: string;
    phone: string;
}

const ITEMS_PER_PAGE = 10;
const MAX_ITEMS = 108;

const TableComponent = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://proovitoo.twn.ee/api/list');
            const result = await response.json() as { list: DataItem[] };
            setData(result.list.slice(0, MAX_ITEMS));
        };
        fetchData();
    }, []);

    console.log(data);

    const extractBirthday = (personalCode: number) => {
        const personalCodeStr = personalCode.toString();
        const century = parseInt(personalCodeStr[0]);
        const year = parseInt(personalCodeStr.slice(1, 3));
        const month = parseInt(personalCodeStr.slice(3, 5)).toString().padStart(2, '0');
        const day = parseInt(personalCodeStr.slice(5, 7)).toString().padStart(2, '0');
        const fullYear = century <= 4 ? 1900 + year : 2000 + year;
        return `${day}.${month}.${fullYear}`;
    };

    const getPaginationRange = (currentPage: number, totalPages: number) => {
        const range: number[] = [];
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } 
        
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + 4);
        const adjustedStart = Math.max(1, end - 4);

        for (let i = adjustedStart; i <= end; i++) {
            range.push(i);
        }

        return range;
    };

    const totalPages = Math.ceil(Math.min(data.length, MAX_ITEMS) / ITEMS_PER_PAGE);
    const displayedData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <ContentContainer>
            <H1 className="text-center mx-auto mb-[24px] md:mb-[30px] ">Nimekiri</H1>
            <div className="block overflow-auto w-full">
                <Table>
                    <THead>
                        <TrHead>
                            <Th>Eesnimi</Th>
                            <Th>Perekonnanimi</Th>
                            <Th>Sugu</Th>
                            <Th>Sunnikuupäev</Th>
                            <Th>Telefon</Th>
                        </TrHead>
                    </THead>
                    <tbody>
                        {displayedData.map((item) => (
                            <TrBody key={item.id}>
                                <Td>{item.firstname}</Td>
                                <Td>{item.surname}</Td>
                                <Td>{item.sex === 'm' ? 'Mees' : 'Naine'}</Td>
                                <Td>{extractBirthday(parseInt(item.personal_code))}</Td>
                                <Td>{item.phone}</Td>
                            </TrBody>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="flex justify-center items-center mt-[20px] font-bold">
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    className={`w-8 h-8 ${currentPage === 1 ? 'opacity-40 cursor-auto' : 'cursor-pointer hover:rounded-[2.5rem] hover:border hover:border-white'}`} 
                >
                    <Image className='h-full my-0 mx-auto text-clip w-auto p-1' src='/arrow.svg' alt="prev" width={150} height={250} priority />
                </button>
                {getPaginationRange(currentPage, totalPages).map((page) => (
                    <button 
                        key={page} 
                        onClick={() => setCurrentPage(page)} 
                        className={`w-8 h-8 ml-4 ${currentPage === page ? 'bg-white text-[#333333] rounded-[2.5rem]' : 'hover:rounded-[2.5rem] hover:border hover:border-white'} `}
                    >
                        {page}
                    </button>
                ))}
                <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                    className={`w-8 h-8 ml-4 ${currentPage === totalPages ? 'opacity-40 cursor-auto' : 'cursor-pointer hover:rounded-[2.5rem] hover:border hover:border-white'}`} 
                >
                    <Image className='h-full my-0 mx-auto text-clip w-auto p-1 rotate-180' src='/arrow.svg' alt="next" width={150} height={250} priority />
                </button>
            </div>
        </ContentContainer>
    );
};

export default TableComponent;