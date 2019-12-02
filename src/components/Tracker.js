import React from 'react';
import ls from 'local-storage';

const Tracker = (props) => {
    let secs = ls.get('trackerTotal');
    let mins = Math.floor(secs / 60) % 60;
    let hours = Math.floor(secs / 3600);
    let seconds = Math.floor(secs % 60);

    return (
        <div className={props.isOn ? "tracker-cont tracker-on" : "tracker-cont"}>
            <button
                className={props.isOn ? "tracker-start-button tracker-button-on" : "tracker-start-button"}
                onClick={props.toggle}
                title="Toggle tracker"
                >
                Tracker
            </button>

            <h3 className="tracker">
                {hours}:{mins < 10 ? "0" + mins : mins}:{seconds < 10 ? "0" + seconds : seconds}
            </h3>
            
            <button
                className="tracker-reset-button"
                onClick={props.reset}
                >
                <i
                    className="fa fa-rotate-left" 
                    id="icon-button-s"
                    title="Reset tracker"></i>
            </button>

            <button
                className="tracker-save-button"
                onClick={props.save}
                index={4}
                >
                <i 
                    className="fa fa-save" 
                    id="icon-button-s"
                    title="Save activity"></i>
            </button>
        </div>
    )
}

export default Tracker;