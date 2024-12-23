'use client';
import React, { useState, useEffect, useCallback } from 'react';

interface GameOfLifeProps {
    numRows: number;
    numCols: number;
    initialLifeProbability: number;
    isRunning: boolean;
    onLivePercentageChange: (newPercentage: number) => void;
}

const GameOfLife = ({ numRows, numCols, initialLifeProbability, isRunning, onLivePercentageChange }: GameOfLifeProps) => {
    const createEmptyGrid = () => {
        return Array.from({ length: numRows }, () => Array(numCols).fill(false));
    };
    const createDeterministicGrid = (initialLifeProbability: number, numRows: number, numCols: number) => {
        const totalCells = numRows * numCols;
        const numAliveCells = Math.floor((initialLifeProbability / 100) * totalCells);
        const percentageAliveCells = totalCells > 0 ? (numAliveCells / totalCells) * 100 : 0;
        const grid = Array.from({ length: totalCells }, () => false); // Start with all dead cells

        // Randomly select indices to set as alive
        let indices = Array.from({ length: totalCells }, (_, i) => i);
        for (let i = 0; i < numAliveCells; i++) {
            const randomIndex = Math.floor(Math.random() * indices.length);
            grid[indices[randomIndex]] = true; // Set cell to alive
            indices.splice(randomIndex, 1); // Remove the index to avoid duplicates
        }

        // Convert flat grid back to 2D array
        return { grid: Array.from({ length: numRows }, (_, rowIndex) => 
            grid.slice(rowIndex * numCols, (rowIndex + 1) * numCols)
        ), percentageAliveCells };
    };

    const [grid, setGrid] = useState(createEmptyGrid());
    const [percentageAliveCells, setPercentageAliveCells] = useState(0);
    const [localIsRunning, setIsRunning] = useState(isRunning);

    useEffect(() => {
        const { grid: newGrid, percentageAliveCells: newPercentageAliveCells } = createDeterministicGrid(initialLifeProbability, numRows, numCols);
        setGrid(newGrid);
        setPercentageAliveCells(newPercentageAliveCells);
    }, [initialLifeProbability, numRows, numCols]);

    useEffect(() => {
        onLivePercentageChange(percentageAliveCells); // Call this only when percentageAliveCells changes
    }, [percentageAliveCells]);

    useEffect(() => {
        setIsRunning(isRunning);
    }, [isRunning]);

    const step = useCallback(() => {
        setGrid((prevGrid) => {
            const newGrid = createEmptyGrid();
            for (let r = 0; r < numRows; r++) {
                for (let c = 0; c < numCols; c++) {
                    const neighbors = [
                        [-1, -1], [-1, 0], [-1, 1],
                        [0, -1],          [0, 1],
                        [1, -1], [1, 0], [1, 1],
                    ];
                    const liveNeighbors = neighbors.reduce((count, [dx, dy]) => {
                        const newRow = r + dx;
                        const newCol = c + dy;
                        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && prevGrid[newRow][newCol]) {
                            count++;
                        }
                        return count;
                    }, 0);
                    if (prevGrid[r][c]) {
                        newGrid[r][c] = liveNeighbors === 2 || liveNeighbors === 3;
                    } else {
                        newGrid[r][c] = liveNeighbors === 3;
                    }
                }
            }
            const totalCells = numRows * numCols;
            const numAliveCells = newGrid.flat().filter(cell => cell).length;
            const newPercentageAliveCells = totalCells > 0 ? (numAliveCells / totalCells) * 100 : 0;
            setPercentageAliveCells(newPercentageAliveCells);
            return newGrid;
        });
    }, [numRows, numCols]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (localIsRunning) {
            interval = setInterval(step, 100);
        }
        return () => clearInterval(interval);
    }, [localIsRunning, step]);

    const randomizeGrid = (numAliveCells: number) => {
        const newGrid = createEmptyGrid();
        let count = 0;
        while (count < numAliveCells) {
            const row = Math.floor(Math.random() * numRows);
            const col = Math.floor(Math.random() * numCols);
            if (!newGrid[row][col]) {
                newGrid[row][col] = true;
                count++;
            }
        }
        const totalCells = numRows * numCols;
        const newPercentageAliveCells = totalCells > 0 ? (numAliveCells / totalCells) * 100 : 0;
        setGrid(newGrid);
        setPercentageAliveCells(newPercentageAliveCells);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 10px)` }}>
                {grid.map((row, r) =>
                    row.map((cell, c) => (
                        <div key={`${r}-${c}`} style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: cell ? 'black' : 'white',
                            border: '1px solid gray',
                        }} />
                    )))
                }
            </div>
        </div>
    );
};

export default GameOfLife;
