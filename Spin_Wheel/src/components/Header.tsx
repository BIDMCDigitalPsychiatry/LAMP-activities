import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRedo, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  onBack: () => void;
  onRefresh: () => void;
  onForward?: () => void;
  showForward: boolean;
}

export default function Header({ onBack, onRefresh, onForward, showForward }: HeaderProps) {
  return (
    <div className="heading">
      <nav className="back-link" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </nav>
      Spin the Wheel
      {showForward && onForward && (
        <nav className="home-link-forward" onClick={onForward}>
          <FontAwesomeIcon icon={faArrowRight} />
        </nav>
      )}
      <nav className="home-link" onClick={onRefresh}>
        <FontAwesomeIcon icon={faRedo} />
      </nav>
    </div>
  );
}
