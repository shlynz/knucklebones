import { Peer } from 'peerjs';
import { useState } from 'react';

const LobbyManager = ({setConnection}) => {

    let [peerId, setPeerId] = useState('');
    let [connectionId, setConnectionId] = useState('');

    let createGame = () => {
        if(peerId) return;
        setPeerId('Awaiting ID')
        const peer = new Peer();
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            setPeerId(id);
            peer.on('connection', (conn) => {
                console.log('connection received')
                setConnection(conn);
            });
        });
    }

    let joinGame = () => {
        const peer = new Peer();
        peer.on('open', (id) => {
            console.log('My PeerID ' + id);
            console.log('connecting to ' + connectionId);
            let conn = peer.connect(connectionId);
            conn.on('open', () => {
                console.log('connection opened...')
                setConnection(conn);
            });
        });
    }

    return(
        <div className='lobby-manager'>
            <p>LobbyManager</p>
            <label htmlFor='lobby-id'>Lobby ID: </label>
            <input id='lobby-id' onChange={event => setConnectionId(event.target.value)} value={connectionId}/><br/>
            <label htmlFor='own-id'>Your ID: </label>
            <input id='own-id' value={peerId} readOnly /><br/>
            <a className='button' onClick={createGame}>Create Game</a><br/>
            <a className='button' onClick={joinGame}>Join Game</a><br/>
        </div>
    )
}

export default LobbyManager;