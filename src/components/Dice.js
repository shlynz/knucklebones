import { useState } from 'react';

const Dice = ({diceResult, setDiceResult}) => {

    const roll = () => setDiceResult(Math.floor(Math.random() * 6) + 1);

    return(<a className='dice' onClick={roll}>{diceResult}</a>)

}

export default Dice;