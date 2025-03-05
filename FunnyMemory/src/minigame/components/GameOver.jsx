import '../styles/GameOver.css';
import i18n from "./../../i18n";

export default function GameOver({highestScore, overlayStyle, modalStyle, resetGame, language}) {
    i18n.changeLanguage(!language ? "en-US" : language);
    return (
        <div id="overlay" style={overlayStyle}>
            <div id="game-over-modal" style={modalStyle}>
                <h2>{i18n.t("YOU_LOST")}</h2>
                <h3>{i18n.t("HIGHEST_SCORE")}: {highestScore}</h3>
                <p>{i18n.t("CLICKED_SAME_COLOUR_TEXT")}</p>
                <button onClick={()=>resetGame()}>{i18n.t("TRY_AGAIN")}</button>
            </div>
        </div>
    )
}
