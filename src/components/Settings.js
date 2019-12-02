import React, {Component} from 'react';
import Sound from './Sound.js';

class Settings extends Component {
    handleSettings = (event) => {
        this.props.onChange(event);
    }

    render = () => {
        return(
            <div>
                <div className="settings-header glow-white">
                    <h2 className="setts-head-text">Settings</h2>
                    <button 
                        className="close-settings" 
                        onClick={this.props.close}>
                        <i id="fa-close" className="fa fa-close" />
                    </button>
                </div>

                <div>
                    <h4 className="form-title">Durations</h4>
                    <form 
                        className="input-form"
                        onSubmit={this.onSubmit}>
                        <div className="form-labels">
                            <p>Pomodoro:</p>
                            <p>Short break:</p> 
                            <p>Long break:</p>
                        </div>
                        <div className="inputs">
                            <input 
                                className="input-box"
                                name="pomLength"
                                min={1}
                                value={this.props.state.pomLength}
                                onChange={this.handleSettings}
                                type="number" />
                            <input 
                                className="input-box"
                                name="shortBreak"
                                min={1}
                                value={this.props.state.shortBreak}
                                onChange={this.handleSettings}
                                type="number" />

                            <input 
                                className="input-box"
                                min={1}
                                name="longBreak"
                                value={this.props.state.longBreak}
                                onChange={this.handleSettings}
                                type="number" />
                        </div>
                    </form>
                </div>

                <div>
                    <Sound />
                    <h4 className="sounds">Alarms</h4>
                    <div className="sounds-cont">
                        <div className="sounds-sub-1">
                            <input
                                className="sounds-item"  
                                type="radio" 
                                name="alarm"
                                value="beep"
                                checked={this.props.state.alarm === "beep" ? true : false}
                                onChange={this.handleSettings}
                                />
                                Beep

                                <br/>
                                <br/>

                            <input
                                className="sounds-item"  
                                type="radio" 
                                name="alarm"
                                value="clang"
                                checked={this.props.state.alarm === "clang" ? true : false}
                                onChange={this.handleSettings}
                                />
                                Clang
                        </div>
                        <div className="sounds-sub-2">
                            <input
                                className="sounds-item"  
                                type="radio" 
                                name="alarm"
                                value="wood"
                                checked={this.props.state.alarm === "wood" ? true : false}
                                onChange={this.handleSettings}
                                />
                                <span>Wood</span>

                                <br/>
                                <br/>
                            
                            <input
                                className="sounds-item"
                                type="radio" 
                                name="alarm"
                                value="long"
                                checked={this.props.state.alarm === "long" ? true : false}
                                onChange={this.handleSettings}
                            />
                                <span>Long</span>
                        </div>
                    </div>
                    <button
                        className="test-button"
                        onClick={this.props.playAudio}
                        >Test alarm
                    </button>
                </div>
            </div>
        )
    }
}

export default Settings;