import { CellStatus } from "@/utils/enums";

type CellProps = {
    status: CellStatus;
    onClick: Function;
};

export default function Cell({ status, onClick }: CellProps) {
    return (
        <div>
            <p>Cell</p>
        </div>
    );
}
