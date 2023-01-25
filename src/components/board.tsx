import dynamic from "next/dynamic";
const CellDrawing = dynamic(() => import("./cellDrawing"), {
    ssr: false,
});
import { Cell } from "@/utils/types";

type BoardProps = {
    board: Cell[][];
};

export default function Board({ board }: BoardProps) {
    return (
        <div className="bg-black rounded-md p-2">
            {board.map((row, rowIndex) => {
                return (
                    <div className="flex gap-0.5 mb-0.5" key={rowIndex}>
                        {row.map((cell, cellIndex) => {
                            return (
                                <CellDrawing
                                    key={rowIndex + "-" + cellIndex}
                                    cell={cell}
                                ></CellDrawing>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
