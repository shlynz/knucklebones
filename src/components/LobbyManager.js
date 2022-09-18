import { Peer } from 'peerjs';
import { useState } from 'react';

const LobbyManager = ({setConnection, setIsTurn}) => {

    const idPrefix = 'shlynz-knucklebones-';
    const [peerId, setPeerId] = useState('');
    const [connectionId, setConnectionId] = useState('');
    const [isGameCreated, setIsGameCreated] = useState(false);

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
        setPeerId('Awaiting ID');
        setIsGameCreated(true);
        const peer = new Peer(getNewId());
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            setPeerId(id.slice(-6));
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(peerId);
        document.getElementById('copy-id-button').innerText = 'Copied!';
        // TODO give some feedback that the text has been copied
    }

    return(
        <div className='lobby-manager'>
            <h2>Knucklebones</h2>
            <label htmlFor='lobby-id'>Enter your join code here:</label>
            <div className='row'>
                <input className='input' id='lobby-id' onChange={event => setConnectionId(event.target.value)} value={connectionId} autoComplete='off'/>
                <a className='button' onClick={joinGame}>Join Game</a>
            </div>
            <label htmlFor='own-id'>Your ID:</label>
            {isGameCreated
                ?
                    <div className='row'>
                        <input className='input' id='own-id' value={peerId} readOnly />
                        <a className='button' id='copy-id-button' onClick={copyToClipboard}>Copy ID</a>
                    </div>
                :
                    <div className='row' id='create-game-div'>
                        <a className='button' id='create-game-button' onClick={createGame}>Create Game</a>
                    </div>
            }
        </div>
    )
}

export default LobbyManager;