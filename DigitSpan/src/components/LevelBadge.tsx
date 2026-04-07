import React from "react";
import i18n from "../i18n";

interface LevelBadgeProps {
  level: number;
  mode: number;
}

export default function LevelBadge({ level, mode }: LevelBadgeProps) {
  return (
    <div className="level-badge">
      <div>{i18n.t("Level:")} {level}</div>
      <div className="level-badge-mode">
        {mode === 0 ? i18n.t("Forward") : i18n.t("Backward")}
      </div>
    </div>
  );
}
