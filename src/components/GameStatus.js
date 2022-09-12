const GameStatus = ({isGameEnded, localScore, remoteScore}) => {

    return (
        <div className='game-status'>
            <p>Your Score: {localScore?.total}</p>
            <p>Opponents Score: {remoteScore?.total}</p>
        </div>
    )
}

export default GameStatus;