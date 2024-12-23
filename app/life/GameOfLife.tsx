'use client';
import React, { useState, useEffect } from 'react';

const GameOfLife = ({ numRows, numCols, initialLifeProbability, isRunning }: { numRows: number; numCols: number; initialLifeProbability: number; isRunning: boolean }) => {
    const createEmptyGrid = () => {
        return Array.from({ length: numRows }, () => Array(numCols).fill(false));
    };
    const createDeterministicGrid = (initialLifeProbability: number, numRows: number, numCols: number) => {
        return Array.from({ length: numRows }, () => 
            Array.from({ length: numCols }, () => Math.random() < initialLifeProbability / 100)
        );
    };

    const [grid, setGrid] = useState(createEmptyGrid());
    const [localIsRunning, setIsRunning] = useState(isRunning);

    useEffect(() => {
        setGrid(createDeterministicGrid(initialLifeProbability, numRows, numCols));
    }, [initialLifeProbability, numRows, numCols]);

    useEffect(() => {
        setGrid(createDeterministicGrid(initialLifeProbability, numRows, numCols));
    }, [initialLifeProbability, numRows, numCols]);

    const step = () => {
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
            return newGrid;
        });
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (localIsRunning) {
            interval = setInterval(() => {
                step();
            }, 100);
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
        setGrid(newGrid);
    };

    useEffect(() => {
        setIsRunning(isRunning);
    }, [isRunning]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <button onClick={() => randomizeGrid(100)}>Randomize</button>
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
            <button onClick={() => setGrid(createEmptyGrid())}>Reset</button>
        </div>
    );
};

export default GameOfLife;
