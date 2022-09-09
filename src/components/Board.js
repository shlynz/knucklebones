import { useState } from 'react';
import Dice from './Dice';

const Board = ({board, setBoard, remote = false}) => {
    
    const [diceResult, setDiceResult] = useState(6);

    const handleClick = (fieldId) => {
        if(remote) return;
        console.log(fieldId);
        const newBoard = [...board];
        newBoard[fieldId] = diceResult;
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
            {!remote && <Dice diceResult={diceResult} setDiceResult={setDiceResult} />}
        </div>
    )
}

export default Board;