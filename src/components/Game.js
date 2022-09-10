import Board from './Board';
import Dice from './Dice';
import { useState, useEffect } from 'react';

const Game = ({connection, isTurn, setIsTurn}) => {

    const generateBoard = () => Array(9).fill(null);
    const [myBoard, setMyBoard] = useState(generateBoard());
    const [remoteBoard, setRemoteBoard] = useState(generateBoard());
    const [diceResult, setDiceResult] = useState(6);

    const rollDice = (sides) => setDiceResult(Math.floor(Math.random() * sides) + 1);

    connection.on('data', data => {
        setRemoteBoard(data)
        rollDice(6);
        setIsTurn(true);
    });

    useEffect(() => {
        setDiceResult(null);
        connection.send(myBoard);
        setIsTurn(false);
    }, [myBoard]);

    return(
        <div className='game'>
            This is where the game is played
            <Board board={remoteBoard} setBoard={setRemoteBoard} remote={true} />
            <Board board={myBoard} setBoard={setMyBoard} isTurn={isTurn} diceResult={diceResult} />
            <Dice diceResult={diceResult} />
        </div>
    )
}

export default Game;