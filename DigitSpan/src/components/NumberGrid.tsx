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
  onDelete?: () => void;
  onSubmit?: () => void;
}

export default function NumberGrid({ disabled, answers, totalSlots, onTap, onDelete, onSubmit }: NumberGridProps) {
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
      {/* Answer slots + delete */}
      <div className="answer-slots">
        {slots.map((digit, i) => (
          <span
            key={i}
            className={`answer-slot ${digit !== null ? "answer-slot-filled" : ""}`}
          >
            {digit !== null ? digit : ""}
          </span>
        ))}
        {onDelete && !disabled && (
          <button
            className={`delete-btn ${answers.length === 0 ? "disabled" : ""}`}
            onClick={onDelete}
            disabled={answers.length === 0}
          >
            &#x232B;
          </button>
        )}
      </div>

      {/* Keypad */}
      <div className="number-grid-container">
        <div className="number-grid">
          {rows.map((row, rowIndex) => (
            <div className="number-grid-row" key={rowIndex}>
              {row.map((num) => {
                let cls = "number-grid-cell";
                if (disabled || answers.length >= totalSlots) cls += " disabled";
                return (
                  <div
                    key={num}
                    className={cls}
                    onClick={() => answers.length < totalSlots ? handleTap(num) : undefined}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Submit button — visible when all slots filled and delete is enabled */}
      {onSubmit && answers.length === totalSlots && !disabled && (
        <div className="submit-btn-container">
          <button className="submit-btn" onClick={onSubmit}>
            &#x2713;
          </button>
        </div>
      )}
    </div>
  );
}
