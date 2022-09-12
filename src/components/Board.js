import Dice from './Dice';

const Board = ({board, score, setNextMove, isTurn, diceResult, remote = false}) => {
    
    // if a field is getting clicked, check if its not opponents board, its your turn and the field isn't already occupied
    const handleClick = (fieldId) => {
        if(remote || !isTurn) return;
        if(board[fieldId]) return;
        setNextMove({fieldId, diceResult});
    }

    return(
        <div className='board'>
            {
                score?.board.map((score, index) =>
                    <p className='columnScore' key={index}>
                        {score}
                    </p>
                )
            }
            {
                // map the board to a grid of die
                board.map((field, index) => 
                    <a 
                        className='field'
                        key={remote ? `remoteField${index}` : `field${index}`}
                        onClick={() => handleClick(index)}
                    >
                        <Dice diceResult={field}/>
                    </a>
                )
            }
        </div>
    )
}

export default Board;