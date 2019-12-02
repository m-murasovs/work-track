import React from 'react';

const ResetConfirmation = (props) => {
    return(
        <div>
            <p className="confirm-text">Are you sure you want to reset the tracker?</p>
            <button onClick={props.show} className="confirm-butt-c" >Cancel</button>
            <button onClick={props.reset} className="confirm-butt-r" >Reset</button>
        </div>
    )
}

export default ResetConfirmation;