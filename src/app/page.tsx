"use client";

import Game from "@/components/game";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [boardHeight, setBoardHeight] = useState(8);
  const [boardWidth, setBoardWidth] = useState(8);
  const [numberOfMines, setNumberOfMines] = useState(10);

  let gameSettings = new Map([
    ["Easy", [8, 8, 10]],
    ["Medium", [16, 16, 40]],
    ["Hard", [22, 22, 99]],
  ]);

  const changeDifficultySettings = (event: ChangeEvent<HTMLSelectElement>) => {
    let difficultySelected = gameSettings.get(event.target.value);
    if (!difficultySelected) return;
    setBoardHeight(difficultySelected[0]);
    setBoardWidth(difficultySelected[1]);
    setNumberOfMines(difficultySelected[2]);
  };

  return (
    <main className="text-center">
      <h1 className="text-4xl text-center font-bold">Minesweeper</h1>
      <p className="mt-3 mb-3">
        The code is available on GitHub{" "}
        <a
          className="text-blue-500"
          href="https://github.com/Spookywy/minesweeper"
        >
          here
        </a>
        .
      </p>
      <div className="flex justify-center mb-3">
        <p className="font-bold">Difficulty: </p>
        <select onChange={changeDifficultySettings}>
          {Array.from(gameSettings.entries()).map(([difficulty, _], index) => {
            return <option key={index}>{difficulty}</option>;
          })}
        </select>
      </div>
      <Game
        boardHeight={boardHeight}
        boardWidth={boardWidth}
        numberOfMines={numberOfMines}
      ></Game>
    </main>
  );
}
