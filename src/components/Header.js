import React from 'react';

const Header = (props) => {
    return (
        <div>
            <header>
                <h1 className="main-title">Work + Track</h1>
                <div className="modes">
                    <button 
                        className={props.modeIndex === 0 ? "mode mode-selected" : "mode"}
                        onClick={props.modeIndex === 0 ? null : props.onClick}
                        >Countdown
                    </button>
                    <button 
                        className={props.modeIndex === 1 ? "mode mode-selected" : "mode"}
                        onClick={props.modeIndex === 1 ? null : props.onClick}
                        >Stopwatch
                    </button>
                </div>
            </header>
        </div>
    );
}
  
  export default Header;