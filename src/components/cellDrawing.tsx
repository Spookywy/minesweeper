import { CellStatus } from "@/utils/enums";

type CellProps = {
    status: CellStatus;
    onClick: Function;
};

export default function CellDrawing({ status, onClick }: CellProps) {
    const displayStatus = (): string => {
        switch (status) {
            case CellStatus.Flagged:
                return "🚩";
            case CellStatus.RevealedMined:
                return "💣";
            default:
                return "";
        }
    };

    return (
        <div className="bg-sky-600 hover:bg-sky-700 rounded-md w-12 h-12 cursor-pointer flex justify-center items-center">
            <p className="text-2xl">{displayStatus()}</p>
        </div>
    );
}
