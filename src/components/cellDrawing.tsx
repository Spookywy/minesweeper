import { CellStatus } from "@/utils/enums";
import { Cell } from "@/utils/types";
import { MouseEvent, useState } from "react";

type CellProps = {
    cell: Cell;
};

export default function CellDrawing({ cell }: CellProps) {
    const [status, setStatus] = useState(CellStatus.Hidden);

    const displayStatus = (): string => {
        if (cell.isMined) return "💣";
        switch (status) {
            case CellStatus.Flagged:
                return "🚩";
            case CellStatus.RevealedMined:
                return "💣";
            default:
                return cell.value === 0 ? "" : cell.value.toString();
        }
    };

    const onClick = (event: MouseEvent<HTMLElement>) => {
        if (cell.isMined) console.log("Lost");
    };

    const putFlag = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if ([CellStatus.Hidden, CellStatus.Flagged].includes(status))
            status === CellStatus.Hidden
                ? setStatus(CellStatus.Flagged)
                : setStatus(CellStatus.Hidden);
    };

    return (
        <div
            className="bg-green-500 hover:bg-green-400 rounded-md w-12 h-12 cursor-pointer flex justify-center items-center"
            onClick={onClick}
            onContextMenu={putFlag}
        >
            <p className="text-2xl">{displayStatus()}</p>
        </div>
    );
}
