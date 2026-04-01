import React from "react";

interface ModeTransitionOverlayProps {
  onReady: () => void;
}

export default function ModeTransitionOverlay({ onReady }: ModeTransitionOverlayProps) {
  return (
    <div className="mode-overlay">
      <div className="mode-overlay-card">
        <div className="mode-overlay-title">Reverse Order</div>
        <div className="mode-overlay-desc">
          Now you will hear digits and enter them in <strong>reverse</strong> order.
          For example, if you hear 3-7-2, enter 2-7-3.
        </div>
        <button className="mode-overlay-btn" onClick={onReady}>
          Ready
        </button>
      </div>
    </div>
  );
}
