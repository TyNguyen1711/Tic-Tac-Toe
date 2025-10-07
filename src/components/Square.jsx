import { useState } from "react";

const Square = ({ value, onSquareClick, winnerClass }) => {
  return (
    <>
      <div
        className={`square ${winnerClass ? "winning" : ""}`}
        onClick={onSquareClick}
      >
        {value}
      </div>
    </>
  );
};
export default Square;
