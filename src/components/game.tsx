"use client";

import Board from "./board";
import { useState } from "react";
import { CellStatus } from "@/utils/enums";
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

    const initializeBoard = (): Cell[][] => {
        const minesLocations = generateMinesLocation();
        const board = [...Array(boardHeight)].map(() =>
            [...Array(boardWidth)].map(() => ({
                status: CellStatus.Hidden,
                isMined: false,
            }))
        );
        for (let i = 0; i < minesLocations.length; i++) {
            board[minesLocations[i][0]][minesLocations[i][1]].isMined = true;
        }
        return board;
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
