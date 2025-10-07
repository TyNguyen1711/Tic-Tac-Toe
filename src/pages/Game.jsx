import { useState } from "react";
import Board from "../components/Board";
import Square from "../components/square";
import GameInfo from "../components/GameInfo";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      lastMove: 0,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState("");
  const xIsNext = currentMove % 2 === 0;
  const current = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };
  const jumpTo = (nextMove) => {
    setWinner("");
    setIsDraw(false);
    setCurrentMove(nextMove);
  };
  return (
    <div className="game-container">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          current={current}
          onPlay={handlePlay}
          isDraw={isDraw}
          setIsDraw={setIsDraw}
          winner={winner}
          setWinner={setWinner}
        />
      </div>

      <div className="game-info">
        <GameInfo history={history} jumpTo={jumpTo} />
      </div>
    </div>
  );
};
export default Game;
