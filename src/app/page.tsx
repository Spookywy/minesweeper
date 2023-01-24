import Game from "@/components/game";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <h1 className="text-4xl text-center font-bold">Minesweeper</h1>
            <Game boardHeight={8} boardWidth={8} numberOfMines={10}></Game>
        </main>
    );
}
