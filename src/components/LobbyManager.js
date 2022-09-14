import { Peer } from 'peerjs';
import { useState } from 'react';

const LobbyManager = ({setConnection, setIsTurn}) => {

    const idPrefix = 'shlynz-knucklebones-';
    const [peerId, setPeerId] = useState('');
    const [connectionId, setConnectionId] = useState('');

    const getNewId = () => {
        // I know this is a bad way to 'generate IDs' but for the scope of this project it'll do
        // placed into a function to make a potential change in the future easier :)
        return idPrefix + Date.now().toString().slice(-6);
    }

    const resetToHomepage = () => {
        window.location.reload();
    }

    const createGame = () => {
        if(peerId) return;
        setPeerId('Awaiting ID')
        const peer = new Peer(getNewId());
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            setPeerId(id);
            peer.on('connection', (conn) => {
                console.log('connection received');
                setConnection(conn);
                setIsTurn(true);
                conn.on('close', resetToHomepage);
            });
        });
    }

    const joinGame = () => {
        const peer = new Peer();
        peer.on('open', (id) => {
            console.log('My PeerID ' + id);
            console.log('connecting to ' + connectionId);
            let conn = peer.connect(idPrefix + connectionId);
            conn.on('open', () => {
                console.log('connection opened...');
                setConnection(conn);
            });
            conn.on('close', resetToHomepage);
        });
    }

    return(
        <div className='lobby-manager'>
            <p>LobbyManager</p>
            <label htmlFor='lobby-id'>Lobby ID: </label>
            <input id='lobby-id' onChange={event => setConnectionId(event.target.value)} value={connectionId}/><br/>
            <label htmlFor='own-id'>Your ID: </label>
            <input id='own-id' value={peerId.slice(-6)} readOnly /><br/>
            <a className='button' onClick={createGame}>Create Game</a><br/>
            <a className='button' onClick={joinGame}>Join Game</a><br/>
        </div>
    )
}

export default LobbyManager;