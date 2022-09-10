const Board = ({board, setBoard, isTurn, diceResult, remote = false}) => {
    

    const handleClick = (fieldId) => {
        if(remote || !isTurn) return;
        if(board[fieldId]) return;
        const newBoard = [...board];
        newBoard[fieldId] = diceResult;
        console.log(newBoard);
        setBoard(newBoard);
    }

    return(
        <div className='board'>
            {
                board.map((field, index) => 
                    <a 
                        className='field'
                        key={remote ? `remoteField${index}` : `field${index}`}
                        onClick={() => handleClick(index)}
                    >
                        {field}
                    </a>
                )
            }
        </div>
    )
}

export default Board;