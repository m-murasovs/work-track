import React from 'react';

const ClearAllConfirm = (props) => {
    return(
        <div>
            <p className="confirm-text">Are you sure you want to clear all activity?</p>
            <button onClick={props.show} className="confirm-butt-c" >Cancel</button>
            <button onClick={props.reset} className="confirm-butt-r" >Clear</button>
        </div>
    )
}

export default ClearAllConfirm;