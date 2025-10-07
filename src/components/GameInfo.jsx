import { useState } from "react";

const GameInfo = ({ history, jumpTo }) => {
  const [isIncreasing, setIsIncreasing] = useState(true);

  const size = (history?.length - 1) | 0;
  const historyRender = isIncreasing ? history : [...history].reverse();

  return (
    <>
      <div className="info-header">Move History</div>
      <div style={{ position: "relative" }}>
        <button
          className="sort-button"
          onClick={() => setIsIncreasing(!isIncreasing)}
        >
          <span>Sort: {isIncreasing ? "Descending" : "Increasing"}</span>
          <span>⇅</span>
        </button>
      </div>
      <ol className="moves-list">
        {historyRender.map((item, index) => {
          const i = isIncreasing ? index : size - index;

          return (
            <li key={index} className="move-item" onClick={() => jumpTo(i)}>
              <div
                className={`${
                  i === size && size != 0 ? "current-move" : "move-button"
                }`}
              >
                <span className="move-number">
                  {i === 0
                    ? " Go to start"
                    : i == size
                    ? `You are at move #${i}`
                    : `Go to move #${i}`}
                </span>
                <span className="move-position">
                  {i !== 0 &&
                    `(${Math.floor(item.lastMove / 3)}, ${item.lastMove % 3})`}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
};
export default GameInfo;
