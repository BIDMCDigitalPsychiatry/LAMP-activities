import React from "react";

interface BoxProps {
  data?: Array<string>;
  currentSymbol?: string;
  className?: string;
}

export default function Box({ data, currentSymbol, className }: BoxProps) {
  if (data) {
    // Legend mode: show symbol-to-number mapping
    return (
      <div className={`sdst-legend ${className || ""}`}>
        {data.map((value: string, index: number) => (
          <div className="sdst-legend-cell" key={index}>
            <div className="sdst-legend-symbol">{value}</div>
            <div className="sdst-legend-divider" />
            <div className="sdst-legend-number">{index + 1}</div>
          </div>
        ))}
      </div>
    );
  }

  // Single symbol display mode
  return (
    <div className={`sdst-current-symbol ${className || ""}`}>
      <div className="sdst-symbol-card">{currentSymbol}</div>
    </div>
  );
}
