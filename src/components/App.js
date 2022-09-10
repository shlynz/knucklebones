import LobbyManager from './LobbyManager'
import Game from './Game';
import { useState } from 'react';

const App = () => {

    const [conn, setConn] = useState();
    const [isTurn, setIsTurn] = useState(false);

    return(
        <div className='app'>
            {!conn && <LobbyManager setConnection={setConn} setIsTurn={setIsTurn} />}
            {conn && <Game connection={conn} isTurn={isTurn} setIsTurn={setIsTurn} />}
        </div>
    )
}

export default App;