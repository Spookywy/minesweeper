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
    const initializeBoard = (): Cell[][] => {
        return Array(boardHeight).fill(
            Array(boardWidth).fill({
                status: CellStatus.Hidden,
                isMined: false,
            })
        );
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
