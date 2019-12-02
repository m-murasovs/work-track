import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Stopwatch extends Component {
    state = {
        stopwatchSecs: '00',
        stopwatchMins: '00',
        stopwatchHours: 0,
        stopwatchOn: false,
    }

    stopwatchSeconds = 0;
    intervalHandle = 0;

    //MODE TOGGLER
    modeToggler = () => {
        if (this.props.modeIndex !== 1 || this.props.showIndex === 4 || this.props.showIndex === 6) {
            this.pauseStopwatch();
        }
    } 

    //STOPWATCH
    stopwatchTick = () => {
        this.modeToggler();

        let secs = this.stopwatchSeconds + 1;
        let seconds = Math.floor(secs % 60);
        let mins = Math.floor(secs / 60) % 60;
        let hours = Math.floor(secs / 3600);
        

        this.setState({
            stopwatchHours: hours,
            stopwatchMins: mins,
            stopwatchSecs: seconds
        })

        if (seconds < 10) { this.setState({ stopwatchSecs: "0" + seconds }) };
        if (mins < 10) { this.setState({ stopwatchMins: "0" + mins }) };

        this.stopwatchSeconds++;

        this.renderTitle();
    
        //track the amount of time worked
        if (this.props.trackerOn) {
            this.props.addToTracker();
        }
    }
    
    startStopwatch = () => {
        if (this.state.stopwatchOn) {
        return
        } else {
        this.setState({ stopwatchOn: true });
        this.intervalHandle = setInterval(this.stopwatchTick, 1000);
        }
    }

    pauseStopwatch = () => {
        this.setState({ stopwatchOn: false });
        clearTimeout(this.intervalHandle);
    }

    resetStopwatch = () => {
        this.setState({ 
            stopwatchOn: false,
            stopwatchHours: 0,
            stopwatchMins: '00',
            stopwatchSecs: '00'
        });
        this.stopwatchSeconds = 0;
        clearTimeout(this.intervalHandle);

        ReactDOM.render("Work + Track", document.getElementById('title'));
    }

    //TITLE
    renderTitle = () => {
        if (this.state.stopwatchOn) {
            let title = "(" + this.state.stopwatchHours + ":" + this.state.stopwatchMins + ":" + this.state.stopwatchSecs + ") "+ "Work + Track";
            ReactDOM.render(title, document.getElementById('title'));
        }
    }

    render = () => {
        return (
            <div>
                <p className="stopwatch">
                    {this.state.stopwatchHours}:{this.state.stopwatchMins}:{this.state.stopwatchSecs}
                </p>

                <div className="controls-cont">
                    <button
                        onClick={this.startStopwatch}
                        className="start-button control-button"
                        title="Start stopwatch"
                        >
                        <i className="fa fa-play" id="icon-button"></i>
                    </button>
                    <button
                        onClick={this.pauseStopwatch}
                        className="pause-button control-button"
                        title="Pause stopwatch"
                        >
                        <i className="fa fa-pause" id="icon-button"></i>
                    </button>
                    <button
                        onClick={this.resetStopwatch}
                        className="reset-button control-button"
                        title="Reset stopwatch"
                        >
                        <i className="fa fa-rotate-left" id="icon-button"></i>
                    </button>
                </div>

            </div>
        );
    }
}
  
  export default Stopwatch;