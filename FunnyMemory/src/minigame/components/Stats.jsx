import '../styles/Stats.css';


export default function Stats({level, score, highestScore}) {
    
    return (
        <div id="stats">
            <h5>Level: {level}</h5>
            <div>
                <h6>Score: {score}</h6>
                <h6>Highest Score: {highestScore}</h6>
            </div>
            <hr/>
        </div>
    )
}