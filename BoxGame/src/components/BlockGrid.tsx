import React from "react";

interface Props {
  highlightedBlock: number | null;
  feedbackStates: Record<number, "correct" | "wrong">;
  disabled: boolean;
  onBlockTap: (blockNumber: number) => void;
}

const BlockGrid: React.FC<Props> = ({ highlightedBlock, feedbackStates, disabled, onBlockTap }) => {
  const blocks: number[] = [];
  for (let i = 1; i <= 16; i++) blocks.push(i);

  return (
    <div className="block-grid">
      {blocks.map((n) => {
        const feedback = feedbackStates[n];
        const isHighlighted = highlightedBlock === n;
        const classes = [
          "block-cell",
          isHighlighted ? "highlight" : "",
          feedback === "correct" ? "correct" : "",
          feedback === "wrong" ? "wrong" : "",
          disabled ? "disabled" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={n}
            className={classes}
            onClick={() => {
              if (!disabled) onBlockTap(n);
            }}
          >
            {feedback === "correct" && <span className="feedback-icon">&#10003;</span>}
            {feedback === "wrong" && <span className="feedback-icon">&#10007;</span>}
          </div>
        );
      })}
    </div>
  );
};

export default BlockGrid;
