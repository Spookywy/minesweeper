"use client";

import Board from "./board";
import { useState } from "react";

export default function Game() {
    const [boardHeight, setBoardHeight] = useState(8);
    const [boardWidth, setBoardWidth] = useState(8);
    const [numberOfMines, setNumberOfMines] = useState(10);

    return (
        <div>
            <p>
                Board settings: {boardHeight.toString()}x{boardWidth.toString()}{" "}
                - {numberOfMines.toString()} mines
            </p>
            <Board
                boardHeight={boardHeight}
                boardWidth={boardWidth}
                numberOfMines={numberOfMines}
            ></Board>
        </div>
    );
}
