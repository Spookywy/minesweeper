"use client";

import dynamic from "next/dynamic";
const Board = dynamic(() => import("./board"), {
    ssr: false,
});
import { useState } from "react";
import { Cell } from "@/utils/types";

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
    const generateMinesLocation = (): number[][] => {
        const possibleLocations = [...Array(boardHeight * boardWidth)].map(
            (x, index) => [
                (index - (index % boardHeight)) / boardHeight,
                index % boardHeight,
            ]
        );
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

    const initializeBoard = (): Cell[][] => {
        const minesLocations = generateMinesLocation();
        const initBoard = [...Array(boardHeight)].map(() =>
            [...Array(boardWidth)].map(() => ({
                value: 0,
                isMined: false,
            }))
        );
        for (let i = 0; i < minesLocations.length; i++) {
            let x = minesLocations[i][0];
            let y = minesLocations[i][1];
            initBoard[x][y].isMined = true;
            warnMinesNeighbours(initBoard, x, y);
        }
        return initBoard;
    };

    const [board, setBoard] = useState(initializeBoard());

    return (
        <div className="flex flex-col items-center">
            <p>
                Board settings: {boardHeight.toString()}x{boardWidth.toString()}{" "}
                - {numberOfMines.toString()} mines
            </p>
            <Board board={board}></Board>
        </div>
    );
}
