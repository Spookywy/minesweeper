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
    <main className="text-center m-4">
      <h1 className="bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent from-green-500 to-yellow-500">
        Minesweeper
      </h1>
      <div className="flex justify-center my-5">
        <p className="font-bold mr-3">Difficulty:</p>
        <select onChange={changeDifficultySettings} className="text-black">
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
