import LobbyManager from './LobbyManager'
import Game from './Game';
import { useState } from 'react';

const App = () => {

    const [conn, setConn] = useState();

    return(
        <div className='app'>
            {!conn && <LobbyManager setConnection={setConn}/>}
            {conn && <Game connection={conn}/>}
        </div>
    )
}

export default App;