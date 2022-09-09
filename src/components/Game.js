import Board from './Board';
import { useState, useEffect } from 'react';

const Game = ({connection}) => {

    const generateBoard = () => Array(9).fill(0);
    const [myBoard, setMyBoard] = useState(generateBoard());
    const [remoteBoard, setRemoteBoard] = useState(generateBoard());

    connection.on('data', data =>{
        setRemoteBoard(data)
    })

    useEffect(() =>{
        connection.send(myBoard)
    }, [myBoard])

    return(
        <div className='game'>
            This is where the game is played
            <Board board={remoteBoard} setBoard={setRemoteBoard} remote={true}/>
            <Board board={myBoard} setBoard={setMyBoard}/>
        </div>
    )
}

export default Game;