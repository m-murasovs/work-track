import React from 'react';

const Controls = (props) => {
    return (
        <div>
            <button
                onClick={props.startButton}
                className="start-button control-button"
                >Start
            </button>
            <button
                onClick={props.pauseCountdown}
                className="pause-button control-button"
                >Pause
            </button>
            <button
                onClick={props.resetCountdown}
                className="reset-button control-button"
                >Reset
            </button>
        </div>
    )
}

export default Controls;