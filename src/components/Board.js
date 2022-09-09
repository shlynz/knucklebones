const Board = ({board, setBoard, remote = false}) => {

    const handleClick = (fieldId) => {
        if(remote) return;
        console.log(fieldId);
        const newBoard = [...board];
        newBoard[fieldId] = 1;
        console.log(newBoard);
        setBoard(newBoard);
    }

    return(
        <div className='board'>
            {
                board.map((field, index) => 
                    <div 
                        className='field'
                        key={remote ? `remoteField${index}` : `field${index}`}
                        onClick={() => handleClick(index)}
                    >
                        {field}
                    </div>
                )
            }
        </div>
    )
}

export default Board;