const Dice = ({diceResult}) => {

    const faces = [
        [
            false, false, false,
            false, true, false,
            false, false, false
        ],
        [
            false, false, true,
            false, false, false,
            true, false, false
        ],
        [
            false, false, true,
            false, true, false,
            true, false, false
        ],
        [
            true, false, true,
            false, false, false,
            true, false, true
        ],
        [
            true, false, true,
            false, true, false,
            true, false, true
        ],
        [
            true, false, true,
            true, false, true,
            true, false, true
        ]
    ]

    const getDiceFace = (nr) => {
        if(!nr) return;
        const face = nr-1;
        return faces[face].map((isPip, pipIndex) => {
            return <p className={isPip ? 'pip' : 'filler-pip' } key={pipIndex} />
        });
    }

    if(diceResult && diceResult <= faces.length){
        return <div className='dice'>{getDiceFace(diceResult)}</div>
    }
}

export default Dice;