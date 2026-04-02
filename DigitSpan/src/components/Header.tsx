import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRedo, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";

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
      {i18n.t("Digit Span")}
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
