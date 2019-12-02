import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sound from './Sound.js';
import ls from 'local-storage';

class Timer extends Component {

    componentDidMount = () => {
        this.setState({
            minutesLeft: ls.get('pomLength'),
        })
        this.duration = ls.get('pomLength');
        this.secondsRemaining = ls.get('secondsRemaining');
    }

    state = {
        minutesLeft: 25,
        seconds: '00',
        timerOn: false,
        pauseOn: false,
        pomodoroOn: true,
    }

    //TIMER MECHANISM
    secondsRemaining = 0;
    intervalHandle = 0;
    duration = 25;
    tempTime = 0;

    modeToggler = () => {
        if (this.props.state.modeIndex !== 0 || this.props.state.showIndex === 4 || this.props.state.showIndex === 6) {
            this.pauseTimer();
        }
    } 

    //the ticker
    tick = () => {
        this.modeToggler();

        let min = Math.floor(this.secondsRemaining / 60);
        let sec = this.secondsRemaining - (min * 60);

        this.setState({
            minutesLeft: min,
            seconds: sec
        })

        if (sec < 10) { this.setState({ seconds: "0" + sec }) };
        if (min === 0 && sec === 0) { 
            clearInterval(this.intervalHandle) 
            this.props.playAudio();
        };

        this.secondsRemaining--;
        ls.set('secondsRemaining');
        
        this.renderTitle();

        //track the amount of time worked 
        if (this.props.state.trackerOn && this.state.pomodoroOn) {
            this.props.addToTracker();
        }
    }

    timerProcess = () => {
        this.isRunning();
        clearTimeout(this.intervalHandle);
        
        if (this.state.pauseOn) {
            this.notPaused();
            this.secondsRemaining = this.tempTime;
        } else {
            this.secondsRemaining = (this.duration * 60) - 1;
        }
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    startButton = () => {
        if (this.state.timerOn) {
            return
        }
        this.timerProcess();
    }

    pauseTimer = () => {
        this.notRunning();
        this.isPaused();
        clearTimeout(this.intervalHandle);
        this.tempTime = this.secondsRemaining;
    }

    resetTimer = () => {
        this.notRunning();
        this.notPaused();
        clearTimeout(this.intervalHandle);
        this.setState({
            minutesLeft: this.duration,
            seconds: '00'
        })
        this.tempTime = 0;
        this.secondsRemaining = (this.duration * 60) - 1;

        ReactDOM.render("Work + Track", document.getElementById('title'));
    }

    isRunning = () => { this.setState({ timerOn: true }) };

    notRunning = () => { this.setState({ timerOn: false }) };

    isPaused = () => { this.setState({ pauseOn: true }) };

    notPaused = () => { this.setState({ pauseOn: false }) };

    //CONTROLLING THE DURATIONS
    setDuration = (value) => { 
        this.duration = value;
        this.setState({
            minutesLeft: this.duration,
            seconds: '00' 
        })
        if (this.state.pauseOn) {
            this.notPaused();
            this.tempTime = this.duration * 60 - 1;
        }
    }

    pomodoro = () => {
        this.pomodoroOn();
        clearTimeout(this.intervalHandle);
        this.setDuration(this.props.state.pomLength);
        this.timerProcess();
    }

    shortBreak = () => {
        this.pomodoroOff();
        clearTimeout(this.intervalHandle);
        this.setDuration(this.props.state.shortBreak);
        this.timerProcess();
    }

    longBreak = () => {
        this.pomodoroOff();
        clearTimeout(this.intervalHandle);
        this.setDuration(this.props.state.longBreak);
        this.timerProcess();
    }

    pomodoroOn = () => { this.setState({ pomodoroOn: true }) };

    pomodoroOff = () => { this.setState({ pomodoroOn: false }) };

    //TITLE
    renderTitle = () => {
        if (this.state.timerOn || this.state.pauseOn) {
            let title = "(" + this.state.minutesLeft + ":" + this.state.seconds + ") " + "Work + Track ";
            ReactDOM.render(title, document.getElementById('title'));
        }
    }
 
    render = () => {
        return (
            <div>
                <Sound />
                <div className="durations-cont">
                    <button
                        className="duration-button"
                        onClick={this.pomodoro}
                        >
                        Pomodoro
                    </button>
                    <button
                        className="duration-button"
                        onClick={this.shortBreak}
                        >
                        Short Break
                    </button>
                    <button
                        className="duration-button"
                        onClick={this.longBreak}
                        >
                        Long Break
                    </button>
                </div>
                    
                <p className="timer">
                    {this.state.minutesLeft}:{this.state.seconds}
                </p>

                <div className="controls-cont">
                    <button
                        onClick={this.startButton}
                        className="start-button control-button"
                        title="Start countdown"
                        >
                        <i className="fa fa-play" id="icon-button"></i>
                    </button>
                    <button
                        onClick={this.pauseTimer}
                        className="pause-button control-button"
                        title="Pause countdown"
                        >
                        <i className="fa fa-pause" id="icon-button"></i>
                    </button>
                    <button
                        onClick={this.resetTimer}
                        className="reset-button control-button"
                        title="Reset countdown"
                        >
                        <i className="fa fa-rotate-left" id="icon-button"></i>
                    </button>
                </div>

            </div>
        );
    }
}
  
  export default Timer;