import Board from './Board';
import Dice from './Dice';
import { useState, useEffect } from 'react';

const Game = ({connection, isTurn, setIsTurn}) => {

    const generateBoard = () => Array(9).fill(null);
    const [myBoard, setMyBoard] = useState(generateBoard());
    const [remoteBoard, setRemoteBoard] = useState(generateBoard());
    const [diceResult, setDiceResult] = useState();
    const [nextMove, setNextMove] = useState();

    // rolls a dice with the specified number of sides
    const rollDice = (sides) => setDiceResult(Math.floor(Math.random() * sides) + 1);

    // do a move for the specified board and return the new board states
    const doMove = (movedBoard, setMovedBoard, otherBoard, setOtherBoard, move, setMove) => {
        const newOtherBoard = otherBoard.map((value, index) => (value === move.diceResult && index % 3 === move.fieldId % 3) ? null : value);
        setOtherBoard(newOtherBoard);

        const newMovedBoard = [...movedBoard];
        newMovedBoard[move.fieldId] = move.diceResult;
        setMovedBoard(newMovedBoard);

        setMove(null);

        return {movedBoard: newMovedBoard, otherBoard: newOtherBoard};
    };

    // if data is received, update the boards and start local turn
    connection.on('data', data => {
        setMyBoard(data.otherBoard);
        setRemoteBoard(data.movedBoard);
        rollDice(6);
        setIsTurn(true);
    });

    // do once on load
    useEffect(() => {
        if(isTurn) rollDice(6);
    }, [])

    // if a move is made, update the boards, send them to peer and end local turn
    useEffect(() => {
        if(!nextMove) return;
        const {movedBoard, otherBoard} = doMove(myBoard, setMyBoard, remoteBoard, setRemoteBoard, nextMove, setNextMove);
        connection.send({movedBoard, otherBoard});
        setDiceResult(null);
        setIsTurn(false);
    }, [nextMove]);

    return(
        <div className='game'>
            This is where the game is played
            <Board board={remoteBoard} remote={true} />
            <Board board={myBoard} setNextMove={setNextMove} isTurn={isTurn} diceResult={diceResult} />
            <Dice diceResult={diceResult} />
        </div>
    )
}

export default Game;