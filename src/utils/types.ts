import { CellStatus } from "./enums";

export interface Cell {
    status: CellStatus;
    isMined: boolean;
}
