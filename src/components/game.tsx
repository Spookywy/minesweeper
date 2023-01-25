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
        const pickedLocations = Array();
        const protectedArea = getNeighbours(cellX, cellY);
        protectedArea.push([cellX, cellY]);

        while (pickedLocations.length < numberOfMines) {
            const locationX = Math.floor(Math.random() * boardHeight);
            const locationY = Math.floor(Math.random() * boardWidth);

            const newLocationIsProtected = protectedArea.find(
                (elem) => elem[0] === locationX && elem[1] === locationY
            );
            if (newLocationIsProtected) continue;
            pickedLocations.push([locationX, locationY]);
        }
        return pickedLocations;
    };

    const warnMinesNeighbours = (initBoard: Cell[][], x: number, y: number) => {
        const neighbours = getNeighbours(x, y);
        for (let i = 0; i < neighbours.length; i++) {
            initBoard[neighbours[i][0]][neighbours[i][1]].value++;
        }
    };

    const getNeighbours = (x: number, y: number): number[][] => {
        const neighbours = Array();
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
                neighbours.push([neignbourX, neignbourY]);
            }
        }
        return neighbours;
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
        revealNeighbours(modifiedBoard, cellX, cellY);
        setBoard(modifiedBoard);
    };

    const revealNeighbours = (
        board: Cell[][],
        cellX: number,
        cellY: number
    ) => {
        const currentCell = board[cellX][cellY];
        if (currentCell.isMined) return;

        currentCell.isVisible = true;

        if (currentCell.value === 0) {
            const neighbours = getNeighbours(cellX, cellY);
            for (let i = 0; i < neighbours.length; i++) {
                if (!board[neighbours[i][0]][neighbours[i][1]].isVisible)
                    revealNeighbours(board, neighbours[i][0], neighbours[i][1]);
            }
        }
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
