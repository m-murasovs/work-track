import React, {Component} from 'react';
import ls from 'local-storage';

class SaveModal extends Component {

    componentDidMount = () => {
        this.getTime();
    }

    today = new Date();
    date = this.today.getDate() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getFullYear();

    newItem = '';
    secs = 0;
    hours = 0; 
    mins = 0; 
    seconds = 0;

    getTime = () => {
        this.secs = ls.get('trackerTotal');
        this.hours = Math.floor(this.secs / 3600);
        this.mins = Math.floor(this.secs / 60) % 60 < 10 ? "0" + Math.floor(this.secs / 60) % 60 : Math.floor(this.secs / 60) % 60;
        this.seconds = Math.floor(this.secs % 60) < 10 ? "0" + Math.floor(this.secs % 60) : Math.floor(this.secs % 60);
    }

    createItem = (event) => {
        this.getTime();
        if (event.target.value !== '') {
            let timeWorked = this.hours + ":" + this.mins + ":" + this.seconds;

            this.newItem = {
                time: timeWorked,
                activity: event.target.value,
                date: this.date,
                key: Date.now()
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.secs > 0 && this.newItem !== '' && this.activityForm !== '') {
            this.props.save(this.newItem);
            this.newItem = '';
            this.activityForm.reset();
            this.getTime();
            this.props.close();
        } else if (event.target.value === '') {
            this.activityForm.reset();
            alert("Please enter an activity.")
        } else if (this.secs === 0) {
            this.activityForm.reset();
            alert("Time worked is 0, no point saving the activity.")
        }
    }

    render = () => {
        this.getTime();
        return (
            <div>
                <div className="settings-header glow-white">
                <h2 className="setts-head-text">Save Activity</h2>
                <button 
                    className="close-settings" 
                    onClick={this.props.close}>
                    <i id="fa-close" className="fa fa-close" />
                </button>
                </div>
    
                <div className="save-cont">
                    <div className="activity-input">
                        <form 
                            onSubmit={this.handleSubmit} 
                            ref={ (el) => this.activityForm = el }>
                            <label>
                                Activity:
                                <input
                                    type="text"
                                    className="input-act"
                                    name="Activity"
                                    placeholder="Today, I ..."
                                    onChange={this.createItem}
                                />
                            </label>    
                        </form>
                    </div>
                    
                    <div className="save-time">
                        <p>Time worked: <span className="worked-time">{this.hours}:{this.mins}:{this.seconds}</span></p>
                        <p>Date: <span className="worked-time">{this.date}</span></p>
                        
                        <div className="save-button-modal-cont">
                            <button onClick={this.handleSubmit} className="save-button-modal">
                            <i  className="fa fa-save" 
                                id="save-button-modal"
                                title="Save activity"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaveModal;