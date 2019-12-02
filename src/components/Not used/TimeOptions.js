import React from 'react';

const TimeOptions = (props) => {
    return (
        <div className="durations-cont">
            <button
                className="duration-button"
                onClick={props.pomodoro}
                >
                Pomodoro
            </button>
            <button
                className="duration-button"
                onClick={props.shortBreak}
                >
                Short Break
            </button>
            <button
                className="duration-button"
                onClick={props.longBreak}
                >
                Long Break
            </button>
        </div>
    )
}

export default TimeOptions;