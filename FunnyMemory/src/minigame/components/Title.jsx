import '../styles/Title.css';
import i18n from "./../../i18n";

export default function Title({...props}) {
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
    return (
        <div className="title">
            <h1><span className="first-part">{i18n.t("COLOUR")} </span>
             <span className="second-part">{i18n.t("MEMO")}</span></h1>
        </div>
    )
}