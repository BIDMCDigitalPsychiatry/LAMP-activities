import React from "react";

interface LevelBadgeProps {
  level: number;
  mode: number;
}

export default function LevelBadge({ level, mode }: LevelBadgeProps) {
  return (
    <div className="level-badge">
      <div>Level: {level}</div>
      <div className="level-badge-mode">
        {mode === 0 ? "Forward" : "Backward"}
      </div>
    </div>
  );
}
