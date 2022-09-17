import LobbyManager from './LobbyManager';
import Game from './Game';
import GameStatus from './GameStatus';
import { useState } from 'react';
import Tutorial from './Tutorial';

const App = () => {

    const [conn, setConn] = useState();
    const [isTurn, setIsTurn] = useState(false);
    const [isGameEnded, setIsGameEnded] = useState(false);

    return(
        <div className='app'>
            <div className='main-content'>
                {!conn && <LobbyManager setConnection={setConn} setIsTurn={setIsTurn} />}
                {conn && <Game connection={conn} isTurn={isTurn} setIsTurn={setIsTurn} isGameEnded={isGameEnded} setIsGameEnded={setIsGameEnded} />}
            </div>
            <div className='side-content'>
                <Tutorial />
            </div>
        </div>
    )
}

export default App;