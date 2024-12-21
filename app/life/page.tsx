'use client';
import { useState } from 'react';
import { Button } from '../components/ui/ButtonProps';
import { H1 } from '../components/ui/HeadingProps';
import GameOfLife from './GameOfLife';
import Image from 'next/image'
import { ContentContainer } from '../components/ui/ContainerProps';

const GameOfLifePage = () => {

    const [gridWidth, setGridWidth] = useState(70);
    const [gridHeight, setGridHeight] = useState(30);
    /* const [speed, setSpeed] = useState('normal');
    const [initialLifeProbability, setInitialLifeProbability] = useState(50); */

    const handldeWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGridWidth(Number(e.target.value));
    }

    const handldeHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGridHeight(Number(e.target.value));
    }

    return (
        <ContentContainer>
            <H1 className="mb-6">Conway&apos;s Game of Life</H1>
            <div className="flex flex-wrap gap-x-4 gap-y-4">
                <div className="flex-grow relative">
                    <div className="mb-2">Grid width</div>
                    <select name="width" id="width" onChange={handldeWidthChange} defaultValue={gridWidth} className="cursor-pointer block w-full text-black h-10 rounded-md text-sm appearance-none px-4 radius-md ">
                        <option value="10" className="block h-10">10</option>
                        <option value="20" className="block h-10">20</option>
                        <option value="30" className="block h-10">30</option>
                        <option value="40" className="block h-10">40</option>
                        <option value="50" className="block h-10">50</option>
                        <option value="60" className="block h-10">60</option>
                        <option value="70" className="block h-10">70</option>
                        <option value="80" className="block h-10">80</option>
                    </select>
                    <Image className='absolute text-[#333333] fill   right-3 bottom-7 -rotate-90' src='/arrow-dropdown.svg' alt="prev" width={20} height={20} priority />
                </div>
                <div className="flex-grow relative">
                    <div className="mb-2">Grid height</div>
                    <select name="height" id="height" onChange={handldeHeightChange} defaultValue={gridHeight} className="block relative w-full text-sm h-10 text-black rounded-md appearance-none px-4 radius-md ">
                        <option value="10" className="block h-10">10</option>
                        <option value="20" className="block h-10">20</option>
                        <option value="30" className="block h-10">30</option>
                        <option value="40" className="block h-10">40</option>
                        <option value="50" className="block h-10">50</option>
                    </select>
                    <Image className='absolute text-[#333333] fill   right-3 bottom-7 -rotate-90' src='/arrow-dropdown.svg' alt="prev" width={20} height={20} priority />
                </div>
                <div className="flex-grow relative">
                    <div className="mb-2">Speed</div>
                    <select name="speed" id="speed" className="block w-full text-black text-sm h-10 rounded-md appearance-none px-4 radius-md ">
                        <option value="slow" className="block h-10">Slow</option>
                        <option value="normal" className="block h-10">Normal</option>
                        <option value="fast" className="block h-10">Fast</option>
                    </select>
                    <Image className='absolute text-[#333333] fill   right-3 bottom-7 -rotate-90' src='/arrow-dropdown.svg' alt="prev" width={20} height={20} priority />
                </div>
                <div className="flex-grow relative">
                    <div className="mb-2">Initial life probability</div>
                    <select name="probability" id="probability" className="block w-full text-sm h-10 text-black rounded-md appearance-none px-4 radius-md ">
                        <option value="10" className="block h-10">10%</option>
                        <option value="20" className="block h-10">20%</option>
                        <option value="30" className="block h-10">30%</option>
                        <option value="40" className="block h-10">40%</option>
                        <option value="50" className="block h-10">50%</option>
                        <option value="60" className="block h-10">60%</option>	
                        <option value="70" className="block h-10">70%</option>
                        <option value="80" className="block h-10">80%</option>
                        <option value="90" className="block h-10">90%</option>
                        <option value="100" className="block h-10">100%</option>
                    </select>
                    <Image className='absolute text-[#333333] fill   right-3 bottom-7 -rotate-90' src='/arrow-dropdown.svg' alt="prev" width={20} height={20} priority />
                </div>
                <Button className="text-[12px] mt-[27px] px-6 py-3">Pause</Button>
                <Button className="text-[12px] mt-[27px] px-6 py-3">Apply</Button>
            </div>
            <span className="mt-6">Currently alive</span>
            <div className="block w-full h-8 bg-[#f1f1f1] rounded-md overflow-hidden relative mb-[20px]">
                <div className="w-[10%] relative px-2 h-full text-shadow-sm text-xs leading-8 bg-highlightColor transition duration-250 transition-width">
                    {/* TODO kui protsent on vähem kui 10, tuleb span right-2 ära muuta, left-2 peale */}
                    <span className="absolute right-2 pl-10 top-1/2 transform -translate-y-1/2">2.5%</span>
                </div>
            </div>
            <GameOfLife numRows={gridHeight} numCols={gridWidth} />
        </ContentContainer>
    );
};

export default GameOfLifePage;