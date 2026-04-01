import React, { useCallback } from "react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const rows: number[][] = [];
for (let i = 0; i < numbers.length; i += 3) {
  rows.push(numbers.slice(i, i + 3));
}

interface NumberGridProps {
  disabled: boolean;
  answers: number[];
  totalSlots: number;
  onTap: (num: number) => void;
}

export default function NumberGrid({ disabled, answers, totalSlots, onTap }: NumberGridProps) {
  const handleTap = useCallback((num: number) => {
    if (disabled) return;
    onTap(num);
  }, [disabled, onTap]);

  // Build slot array: filled answers + empty remaining
  const slots: (number | null)[] = [];
  for (let i = 0; i < totalSlots; i++) {
    slots.push(i < answers.length ? answers[i] : null);
  }

  return (
    <div>
      {/* Answer slots */}
      <div className="answer-slots">
        {slots.map((digit, i) => (
          <span
            key={i}
            className={`answer-slot ${digit !== null ? "answer-slot-filled" : ""}`}
          >
            {digit !== null ? digit : ""}
          </span>
        ))}
      </div>

      {/* Keypad */}
      <div className="number-grid-container">
        <div className="number-grid">
          {rows.map((row, rowIndex) => (
            <div className="number-grid-row" key={rowIndex}>
              {row.map((num) => {
                let cls = "number-grid-cell";
                if (disabled) cls += " disabled";
                return (
                  <div
                    key={num}
                    className={cls}
                    onClick={() => handleTap(num)}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
