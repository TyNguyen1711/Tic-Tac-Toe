import { useEffect, useState } from "react";
import Square from "./square";
import calculateWinner from "../utils/calculateWinner";
const Board = ({
  xIsNext,
  current,
  onPlay,
  isDraw,
  setIsDraw,
  winner,
  setWinner,
}) => {
  const [winningSquares, setWinningSquares] = useState([]);

  const handleClick = (index) => {
    if (current.squares[index] || winner) {
      return;
    }

    const nextSquares = current.squares.slice();
    nextSquares[index] = xIsNext === true ? "X" : "O";

    onPlay({
      squares: nextSquares,
      lastMove: index,
    });
  };
  useEffect(() => {
    const checkWinner = calculateWinner(current.squares);

    if (checkWinner) {
      setWinner(checkWinner.winner);
      setWinningSquares(checkWinner.positions);
      setIsDraw(false);
    } else {
      const hasNull = current.squares.some((item) => item === null);
      if (!hasNull) {
        setIsDraw(true);
        setWinner(null);
      } else {
        setIsDraw(false);
        setWinner(null);
      }
    }
  }, [current.squares]);

  const renderSquares = () => {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      const cols = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        cols.push(
          <Square
            key={index}
            value={current.squares[index]}
            onSquareClick={() => handleClick(index)}
            winnerClass={
              winningSquares && winningSquares.includes(index) && winner
            }
          />
        );
      }
      rows.push(
        <div key={row} className="row">
          {cols}
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <div className={`status ${isDraw ? "draw" : winner ? "winner" : ""}`}>
        {isDraw
          ? "Result: Draw"
          : winner
          ? `Winner:  ${winner}`
          : `Next player: ${xIsNext ? "X" : "O"}`}
      </div>
      {renderSquares()}
    </>
  );
};
export default Board;
