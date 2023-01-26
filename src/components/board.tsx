import dynamic from "next/dynamic";
const CellDrawing = dynamic(() => import("./cellDrawing"), {
    ssr: false,
});
import { Cell } from "@/utils/types";

type BoardProps = {
    board: Cell[][];
    handleCellClick: (
        e: React.MouseEvent<HTMLDivElement>,
        cellX: number,
        cellY: number
    ) => void;
    handleContextMenu: (
        e: React.MouseEvent<HTMLDivElement>,
        cellX: number,
        cellY: number
    ) => void;
};

export default function Board({
    board,
    handleCellClick,
    handleContextMenu,
}: BoardProps) {
    return (
        <div className="bg-black rounded-md p-2">
            {board.map((row, cellX) => {
                return (
                    <div className="flex gap-0.5 mb-0.5" key={cellX}>
                        {row.map((cell, cellY) => {
                            return (
                                <CellDrawing
                                    key={cellX + "-" + cellY}
                                    cell={cell}
                                    onContextMenu={(e) =>
                                        handleContextMenu(e, cellX, cellY)
                                    }
                                    onClick={(e) =>
                                        handleCellClick(e, cellX, cellY)
                                    }
                                ></CellDrawing>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
