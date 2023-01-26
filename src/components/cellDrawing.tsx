import { Cell } from "@/utils/types";
import styles from "./cellDrawing.module.css";

type CellProps = {
    cell: Cell;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function CellDrawing({
    cell,
    onClick,
    onContextMenu,
}: CellProps) {
    const displayStatus = (): JSX.Element | undefined => {
        if (cell.isVisible && cell.isMined) return <p>💣</p>;
        if (cell.isVisible && cell.value > 0) {
            let className;
            switch (cell.value) {
                case 1:
                    className = styles.number1;
                    break;
                case 2:
                    className = styles.number2;
                    break;
                case 3:
                    className = styles.number3;
                    break;
                default:
                    className = styles.number4AndAbove;
            }
            return (
                <p className={`${className} font-bold`}>
                    {cell.value.toString()}
                </p>
            );
        }
        if (cell.isFlagged) return <p>🚩</p>;
    };

    return (
        <div
            className={`${
                !cell.isVisible
                    ? "bg-lime-600"
                    : cell.isMined
                    ? "bg-rose-500"
                    : "bg-neutral-300"
            } hover:opacity-80 rounded w-6 h-6 cursor-pointer flex justify-center items-center`}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {displayStatus()}
        </div>
    );
}
