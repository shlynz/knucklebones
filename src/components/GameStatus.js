import { useState, useEffect } from 'react';

const GameStatus = ({isGameEnded, localScore, remoteScore}) => {

    const [resultText, setResultText] = useState();

    const getWinner = () => localScore > remoteScore ? <p>You won!</p> : <p>You lost!</p>

    return (
        <div className='game-status'>
            <p>Your Score: {localScore}</p>
            <p>Opponents Score: {remoteScore}</p>
            {isGameEnded && <p>You {localScore>remoteScore?'won':'lost'}!</p>}
        </div>
    )
}

export default GameStatus;