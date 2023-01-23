import { CellStatus } from "@/utils/enums";
import Cell from "./cell";

type BoardProps = {
    boardHeight: Number;
    boardWidth: Number;
    numberOfMines: Number;
};

export default function Board({
    boardHeight,
    boardWidth,
    numberOfMines,
}: BoardProps) {
    return (
        <div>
            <p>Board</p>
            <Cell
                status={CellStatus.Hidden}
                onClick={() => console.log("clicked")}
            ></Cell>
        </div>
    );
}
