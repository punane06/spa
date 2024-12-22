'use client'
import { useState, useEffect } from "react";
import { H1 } from "../components/ui/HeadingProps";
import { ContentContainer } from "../components/ui/ContainerProps";
import { Table, Td, Th, THead, TrBody, TrHead } from '../components/ui/TableProps';
import Image from 'next/image'
import Loading from "./loading";

export interface DataItem {
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
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<DataItem[]>([]);
    const [defaultData, setDefaultData] = useState<DataItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstnameSortOrder, setFirstnameSortOrder] = useState(0);
    const [surnameSortOrder, setSurnameSortOrder] = useState(0);
    const [sexSortOrder, setSexSortOrder] = useState(0);
    const [birthdaySortOrder, setBirthdaySortOrder] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch('https://proovitoo.twn.ee/api/list');
            const result = await response.json() as { list: DataItem[] };
            const limitedData = result.list.slice(0, MAX_ITEMS);
            setData(limitedData);
            setDefaultData(limitedData);
            setLoading(false);
        };

        fetchData();
    }, []);

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

    const handleFirstnameSort = () => {
        setSurnameSortOrder(0);
        setSexSortOrder(0);
        setBirthdaySortOrder(0);
        setFirstnameSortOrder((prevOrder) => (prevOrder + 1) % 3);

        let sortedData;
        if (firstnameSortOrder === 2) {
            sortedData = defaultData;
        } else if (firstnameSortOrder === 0) {
            sortedData = [...data].sort((a, b) => {
                const firstnameA = a.firstname ?? '';
                const firstnameB = b.firstname ?? '';
                return firstnameA.localeCompare(firstnameB, 'et');
            });
        } else if (firstnameSortOrder === 1) {
            sortedData = [...data].sort((a, b) => {
                const firstnameA = a.firstname ?? '';
                const firstnameB = b.firstname ?? '';
                return firstnameB.localeCompare(firstnameA, 'et');
            });
        }

        const dataToSet = sortedData || [];
        setData(dataToSet);
    };

    const handleSurnameSort = () => {
        setFirstnameSortOrder(0);
        setSexSortOrder(0);
        setBirthdaySortOrder(0);
        setSurnameSortOrder((prevOrder) => (prevOrder + 1) % 3);

        let sortedData;
        if (surnameSortOrder === 2) {
            sortedData = defaultData;
        } else if (surnameSortOrder === 0) {
            sortedData = [...data].sort((a, b) => {
                const surnameA = a.surname || '';
                const surnameB = b.surname || '';
                return surnameA.localeCompare(surnameB, 'et');
            });
        } else if (surnameSortOrder === 1) {
            sortedData = [...data].sort((a, b) => {
                const surnameA = a.surname || '';
                const surnameB = b.surname || '';
                return surnameB.localeCompare(surnameA, 'et');
            });
        }

        const dataToSet = sortedData || [];
        setData(dataToSet);
    };

    const handleSexSort = () => {
        setFirstnameSortOrder(0);
        setSurnameSortOrder(0);
        setBirthdaySortOrder(0);
        setSexSortOrder((prevOrder) => (prevOrder + 1) % 3);

        let sortedData;
        if (sexSortOrder === 2) {
            sortedData = defaultData;
        } else if (sexSortOrder === 0) {
            sortedData = [...data].sort((a, b) => {
                return (a.sex || '').localeCompare(b.sex || '');
            });
        } else if (sexSortOrder === 1) {
            sortedData = [...data].sort((a, b) => {
                return (b.sex || '').localeCompare(a.sex || '');
            });
        }

        const dataToSet = sortedData || [];
        setData(dataToSet);
    };

    const handleBirthdaySort = () => {
        setFirstnameSortOrder(0);
        setSurnameSortOrder(0);
        setSexSortOrder(0);
        setBirthdaySortOrder((prevOrder) => (prevOrder + 1) % 3);

        let sortedData;
        if (birthdaySortOrder === 2) {
            sortedData = defaultData;
        } else if (birthdaySortOrder === 0) {
            sortedData = [...data].sort((a, b) => {
                const birthdayA = extractBirthday(parseInt(a.personal_code));
                const birthdayB = extractBirthday(parseInt(b.personal_code));
                const [dayA, monthA, yearA] = birthdayA.split('.').map(Number);
                const [dayB, monthB, yearB] = birthdayB.split('.').map(Number);
                return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
            });
        } else if (birthdaySortOrder === 1) {
            sortedData = [...data].sort((a, b) => {
                const birthdayA = extractBirthday(parseInt(a.personal_code));
                const birthdayB = extractBirthday(parseInt(b.personal_code));
                const [dayA, monthA, yearA] = birthdayA.split('.').map(Number);
                const [dayB, monthB, yearB] = birthdayB.split('.').map(Number);
                return new Date(yearB, monthB - 1, dayB).getTime() - new Date(yearA, monthA - 1, dayA).getTime();
            });
        }

        const dataToSet = sortedData || [];
        setData(dataToSet);
    };

    return (
        <ContentContainer>
            {loading ? <Loading />	 : (
                <>
                    <H1 className="text-center mx-auto mb-[24px] md:mb-[30px] ">Nimekiri</H1>
                    <div className="block overflow-auto w-full">
                        <Table>
                            <THead>
                                <TrHead>
                                    <Th onClick={handleFirstnameSort} className="cursor-pointer">
                                        <div className="flex items-center">
                                            <span className="mr-1">
                                                Eesnimi
                                            </span>
                                            <div className="relative bg-red-300 h-full w-full">
                                                <Image className={`absolute -bottom-1 rotate-0 ${firstnameSortOrder === 1 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                                <Image className={`absolute -top-1 rotate-180 ${firstnameSortOrder === 2 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                            </div>
                                        </div>
                                    </Th>
                                    <Th onClick={handleSurnameSort} className="cursor-pointer">
                                        <div className="flex items-center">
                                            <span className="mr-1">Perekonnanimi</span>
                                            <div className="relative bg-red-300 h-full w-full">
                                                <Image className={`absolute -bottom-1 rotate-0 ${surnameSortOrder === 1 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                                <Image className={`absolute -top-1 rotate-180 ${surnameSortOrder === 2 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                            </div>
                                        </div>
                                    </Th>
                                    <Th onClick={handleSexSort} className="cursor-pointer">
                                        <div className="flex items-center">
                                            <span className="mr-1">Sugu</span>
                                            <div className="relative bg-red-300 h-full w-full">
                                                <Image className={`absolute -bottom-1 rotate-0 ${sexSortOrder === 1 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                                <Image className={`absolute -top-1 rotate-180 ${sexSortOrder === 2 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                            </div>
                                        </div>
                                    </Th>
                                    <Th onClick={handleBirthdaySort} className="cursor-pointer">
                                        <div className="flex items-center">
                                            <span className="mr-1">Sünnikuupäev</span>
                                            <div className="relative bg-red-300 h-full w-full">
                                                <Image className={`absolute -bottom-1 rotate-0 ${birthdaySortOrder === 1 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                                <Image className={`absolute -top-1 rotate-180 ${birthdaySortOrder === 2 ? 'opacity-0' : ''}`} src='/arrow-filled.svg' alt="sort" width={20} height={20} priority />
                                            </div>
                                        </div>
                                    </Th>
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
                </>
            )}
        </ContentContainer>
    );
};

export default TableComponent;