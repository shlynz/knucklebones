import Board from './Board';
import Dice from './Dice';
import GameStatus from './GameStatus';
import { useState, useEffect } from 'react';

const Game = ({connection, isTurn, setIsTurn, setIsGameEnded}) => {

    const generateBoard = () => Array(9).fill(null);
    const [myBoard, setMyBoard] = useState(generateBoard());
    const [remoteBoard, setRemoteBoard] = useState(generateBoard());
    const [diceResult, setDiceResult] = useState();
    const [nextMove, setNextMove] = useState();
    const [localScore, setLocalScore] = useState();
    const [remoteScore, setRemoteScore] = useState();

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

    // tallies the current score per column and total
    const updateScore = () => {
        const countScore = (board) => {
            const valuesInColumns = [...Array(3)].map(v => Array(7).fill(0));

            board.forEach((value, index) => valuesInColumns[index % 3][value]++);
            console.log(valuesInColumns);
            const columns = valuesInColumns.map(column => column.reduce((prev, curr, index) => curr == 0 ? prev : prev + Math.pow(index, curr), 0));

            const total = columns.reduce((prev, curr) => prev + curr);

            return {board: columns, total};
        }

        setLocalScore(countScore(myBoard));
        setRemoteScore(countScore(remoteBoard));
    }

    // if data is received, update the boards and start local turn
    connection.on('data', data => {
        setMyBoard(data.otherBoard);
        setRemoteBoard(data.movedBoard);
        setIsGameEnded(data.gameEnded);
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

    useEffect(() => updateScore(), [isTurn]);

    return(
        <div className='game'>
            This is where the game is played
            <Board board={remoteBoard} score={remoteScore} remote={true} />
            <Board board={myBoard} score={localScore} setNextMove={setNextMove} isTurn={isTurn} diceResult={diceResult} />
            <Dice diceResult={diceResult} />
            <GameStatus localScore={localScore} remoteScore={remoteScore}/>
        </div>
    )
}

export default Game;