import React from "react";
import i18n from "../i18n";

interface ModeTransitionOverlayProps {
  onReady: () => void;
}

export default function ModeTransitionOverlay({ onReady }: ModeTransitionOverlayProps) {
  return (
    <div className="mode-overlay">
      <div className="mode-overlay-card">
        <div className="mode-overlay-title">{i18n.t("Reverse Order")}</div>
        <div className="mode-overlay-desc" dangerouslySetInnerHTML={{ __html: i18n.t("MODE_TRANSITION") }} />
        <button className="mode-overlay-btn" onClick={onReady}>
          {i18n.t("Ready")}
        </button>
      </div>
    </div>
  );
}
