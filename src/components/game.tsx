"use client";

import dynamic from "next/dynamic";
const Board = dynamic(() => import("./board"), {
    ssr: false,
});
import { useState } from "react";
import { Cell } from "@/utils/types";
import { MouseEvent } from "react";

type GameProps = {
    boardHeight: number;
    boardWidth: number;
    numberOfMines: number;
};

export default function Game({
    boardHeight,
    boardWidth,
    numberOfMines,
}: GameProps) {
    const [gameInProgress, setGameInProgress] = useState(false);

    const createBoard = (): Cell[][] => {
        const initBoard = [...Array(boardHeight)].map(() =>
            [...Array(boardWidth)].map(() => ({
                value: 0,
                isMined: false,
                isVisible: false,
            }))
        );
        return initBoard;
    };

    const [board, setBoard] = useState(createBoard());

    const initBoard = (cellX: number, cellY: number) => {
        let initBoard = [...board];
        const minesLocations = generateMinesLocation(cellX, cellY);
        for (let i = 0; i < minesLocations.length; i++) {
            let x = minesLocations[i][0];
            let y = minesLocations[i][1];
            initBoard[x][y].isMined = true;
            warnMinesNeighbours(initBoard, x, y);
        }
        setBoard(initBoard);
    };

    const generateMinesLocation = (
        cellX: number,
        cellY: number
    ): number[][] => {
        const possibleLocations = [...Array(boardHeight * boardWidth)].map(
            (x, index) => [
                (index - (index % boardHeight)) / boardHeight,
                index % boardHeight,
            ]
        );

        // Remove the first cell revealed from possible mines location
        const loc = cellX * boardWidth + cellY;
        possibleLocations.splice(loc, 1);

        const pickedLocations = Array();
        for (let i = 0; i < numberOfMines; i++) {
            const location = Math.floor(
                Math.random() * possibleLocations.length
            );
            pickedLocations.push(possibleLocations[location]);
            possibleLocations.splice(location, 1);
        }
        return pickedLocations;
    };

    const warnMinesNeighbours = (initBoard: Cell[][], x: number, y: number) => {
        let combinationsX = [x];
        if (x > 0) combinationsX.push(x - 1);
        if (x < 7) combinationsX.push(x + 1);

        let combinationsY = [y];
        if (y > 0) combinationsY.push(y - 1);
        if (y < 7) combinationsY.push(y + 1);

        for (let i = 0; i < combinationsX.length; i++) {
            for (let j = 0; j < combinationsY.length; j++) {
                let neignbourX = combinationsX[i];
                let neignbourY = combinationsY[j];
                if (neignbourX === x && neignbourY === y) continue;
                initBoard[neignbourX][neignbourY].value++;
            }
        }
    };

    const handleCellClick = (
        event: MouseEvent<HTMLElement>,
        cellX: number,
        cellY: number
    ) => {
        if (!gameInProgress) {
            initBoard(cellX, cellY);
            setGameInProgress(true);
        }
        let modifiedBoard = [...board];
        modifiedBoard[cellX][cellY].isVisible = true;
        setBoard(modifiedBoard);
    };

    return (
        <div className="flex flex-col items-center">
            <p>
                Board settings: {boardHeight.toString()}x{boardWidth.toString()}{" "}
                - {numberOfMines.toString()} mines
            </p>
            <Board board={board} handleCellClick={handleCellClick}></Board>
        </div>
    );
}
