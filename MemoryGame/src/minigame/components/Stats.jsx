import '../styles/Stats.css';
import i18n from "./../../i18n";


export default function Stats({level, score, highestScore, language}) {
    i18n.changeLanguage(!language ? "en-US" : language);
    return (
        <div id="stats">
            <h5>{i18n.t("LEVEL")}: {level}</h5>
            <div>
                <h6>{i18n.t("SCORE")}: {score}</h6>
                <h6>{i18n.t("HIGHEST_SCORE")}: {highestScore}</h6>
            </div>
            <hr/>
        </div>
    )
}