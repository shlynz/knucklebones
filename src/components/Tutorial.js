const Tutorial = () => {
    return (
        <div className='tutorial'>
            How to play:
            <ul>
                <li>Each player takes turn rolling a dice.</li>
                <li>The rolled dice can then be placed anywhere in the grid, granted it's not already occupied.</li>
                <li>Placing the same value multiple times in the same column grants increasing score multiplier for that pair (1x, 4x, 9x).</li>
                <li>Also, placing a dice in a colmun, removes every opponents dice in the opposing collumn.</li>
                <li>The game ends if one of the boards is filled.</li>
                <li>No bous points are granted for being the one who ends the game.</li>
                <li>The highest score wins.</li>
            </ul>
        </div>
    )
}

export default Tutorial;