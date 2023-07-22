import { GameStatus } from "@/utils/enum";
import { Cell } from "@/utils/types";
import dynamic from "next/dynamic";
import { MouseEvent, useEffect, useState } from "react";
const Board = dynamic(() => import("./board"), {
  ssr: false,
});

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
  const [gameStatus, setGameStatus] = useState(GameStatus.ReadyToStart);
  const [gameWon, setGameWon] = useState(false);
  const [mines, setMines] = useState(Array());
  const [numberOfRevealedCell, setNumberOfRevealedCell] = useState(0);

  const createBoard = (): Cell[][] => {
    const initBoard = [...Array(boardHeight)].map(() =>
      [...Array(boardWidth)].map(() => ({
        value: 0,
        isMined: false,
        isVisible: false,
        isFlagged: false,
      }))
    );
    return initBoard;
  };

  const [board, setBoard] = useState(createBoard());

  const startNewGame = () => {
    setGameStatus(GameStatus.ReadyToStart);
    setNumberOfRevealedCell(0);
    setGameWon(false);
    setBoard(createBoard());
  };

  const initBoard = (cellX: number, cellY: number) => {
    let modifiedBoard = [...board];

    const minesLocations = generateMinesLocation(cellX, cellY);
    setMines(minesLocations);

    for (let i = 0; i < minesLocations.length; i++) {
      let x = minesLocations[i][0];
      let y = minesLocations[i][1];
      modifiedBoard[x][y].isMined = true;
      warnMinesNeighbours(modifiedBoard, x, y);
    }

    setBoard(modifiedBoard);
  };

  const generateMinesLocation = (cellX: number, cellY: number): number[][] => {
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

      protectedArea.push([locationX, locationY]);
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
    if (x < boardHeight - 1) combinationsX.push(x + 1);

    let combinationsY = [y];
    if (y > 0) combinationsY.push(y - 1);
    if (y < boardWidth - 1) combinationsY.push(y + 1);

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
    if (gameStatus === GameStatus.ReadyToStart) {
      initBoard(cellX, cellY);
      setGameStatus(GameStatus.InProgress);
    }
    if (gameStatus === GameStatus.Over) return;

    if (board[cellX][cellY].isVisible) return;
    if (board[cellX][cellY].isMined) looseParty();

    let modifiedBoard = [...board];
    let nbOfCellRevealedThisRound = revealCells(modifiedBoard, cellX, cellY);

    setNumberOfRevealedCell(numberOfRevealedCell + nbOfCellRevealedThisRound);
    setBoard(modifiedBoard);
  };

  const handleCellContextMenu = (
    event: MouseEvent<HTMLElement>,
    cellX: number,
    cellY: number
  ) => {
    event.preventDefault();

    const currentCell = board[cellX][cellY];
    if (gameStatus !== GameStatus.InProgress || currentCell.isVisible) return;

    let modifiedBoard = [...board];
    modifiedBoard[cellX][cellY].isFlagged = !currentCell.isFlagged;
    setBoard(modifiedBoard);
  };

  const revealCells = (
    board: Cell[][],
    cellX: number,
    cellY: number
  ): number => {
    const currentCell = board[cellX][cellY];
    if (currentCell.isMined) return 0;

    currentCell.isVisible = true;
    let nbOfCellRevealed = 1;

    if (currentCell.value === 0) {
      const neighbours = getNeighbours(cellX, cellY);
      for (let i = 0; i < neighbours.length; i++) {
        if (!board[neighbours[i][0]][neighbours[i][1]].isVisible)
          nbOfCellRevealed += revealCells(
            board,
            neighbours[i][0],
            neighbours[i][1]
          );
      }
    }
    return nbOfCellRevealed;
  };

  const looseParty = () => {
    let modifiedBoard = [...board];
    for (let i = 0; i < mines.length; i++) {
      modifiedBoard[mines[i][0]][mines[i][1]].isVisible = true;
    }
    setBoard(modifiedBoard);

    setGameStatus(GameStatus.Over);
  };

  const checkWinStatus = () => {
    if (numberOfRevealedCell === boardHeight * boardWidth - numberOfMines) {
      setGameWon(true);
      setGameStatus(GameStatus.Over);
    }
  };

  useEffect(() => {
    checkWinStatus();
  }, [numberOfRevealedCell]);

  useEffect(() => {
    startNewGame();
  }, [boardHeight, boardWidth, numberOfMines]);

  return (
    <div className="text-center">
      <div className="overflow-x-auto">
        <Board
          board={board}
          handleCellClick={handleCellClick}
          handleContextMenu={handleCellContextMenu}
        />
      </div>
      <p className="mb-2">
        {boardHeight.toString()}x{boardWidth.toString()} -{" "}
        {numberOfMines.toString()} mines
      </p>
      {gameWon && <p className="font-bold">🎉 Congratulations! You won! 🎉</p>}
      {gameStatus === GameStatus.Over && !gameWon && (
        <p className="font-bold">😭 You lost! 😭</p>
      )}
      {gameStatus !== GameStatus.ReadyToStart && (
        <button
          className="border-2 border-black rounded-lg p-2 mt-2 font-bold hover:bg-black hover:text-white"
          onClick={startNewGame}
        >
          Start a new game
        </button>
      )}
    </div>
  );
}
