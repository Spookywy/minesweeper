import { Cell } from "@/utils/types";
import { MouseEvent, useState } from "react";

type CellProps = {
    cell: Cell;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function CellDrawing({ cell, onClick }: CellProps) {
    const [flag, setFlag] = useState(false);

    const displayStatus = (): string | undefined => {
        if (cell.isVisible && cell.isMined) return "💣";
        if (cell.isVisible && cell.value > 0) return cell.value.toString();
        if (flag) return "🚩";
    };

    const putFlag = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (!cell.isVisible) setFlag(!flag);
    };

    return (
        <div
            className={`${
                cell.isVisible
                    ? "bg-zinc-500 hover:bg-zinc-400"
                    : "bg-green-500 hover:bg-green-400"
            } rounded-md w-12 h-12 cursor-pointer flex justify-center items-center`}
            onClick={onClick}
            onContextMenu={putFlag}
        >
            <p className="text-2xl">{displayStatus()}</p>
        </div>
    );
}
