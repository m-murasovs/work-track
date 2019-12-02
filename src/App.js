import React, {Component} from 'react';
import Timer from './components/Timer.js';
import Settings from './components/Settings.js';
import Tracker from './components/Tracker.js';
import About from './components/About.js';
import MenuButton from './components/MenuButton.js';
import Contact from './components/Contact.js';
import Stopwatch from './components/Stopwatch';
import Header from './components/Header.js';
import ActivityStore from './components/ActivityStore.js';
import SaveModal from './components/SaveModal.js';
import ResetConfirmation from './components/ResetConfirmation.js';
import './App.scss';
import ls from 'local-storage';
import ClearAllConfirm from './components/ClearAllConfirm.js';
//import './App.css';

class App extends Component {
  state = {
    modeIndex: 0,
    trackerOn: true,
    trackerTotal: 0,
    pomLength: 25,
    shortBreak: 5,
    longBreak: 10,
    showIndex: 0,
    alarm: "long",
    activities: [],
  }

  componentDidMount = () => {
    fetch("")
      .then(json => this.setState({
        modeIndex: ls.get('modeIndex') || 0,
        trackerOn: ls.get('trackerOn'),
        trackerTotal: ls.get('trackerTotal') || 0,
        activities: ls.get('activities') || [],
        pomLength: ls.get('pomLength') || 25,
        shortBreak: ls.get('shortBreak') || 5,
        longBreak: ls.get('longBreak') || 10,
        alarm: ls.get('alarm') || "beep",
      })
    )
  }

  //MODE
  toggleMode = () => {
    if (this.state.modeIndex === 0 ) {
      this.setState({ modeIndex: 1 });
      ls.set('modeIndex', 1);
    } else {
      this.setState({ modeIndex: 0 });
      ls.set('modeIndex', 0);
    }
  }

  //PLAY AUDIO
  playAudio = () => {
    let audioEl = '';
    switch(this.state.alarm) {
        default:
            audioEl = document.getElementsByClassName("audio-element-1")[0];
            break;
        case "clang":
            audioEl = document.getElementsByClassName("audio-element-2")[0];
            break;
        case "wood":
            audioEl = document.getElementsByClassName("audio-element-3")[0];
            break;
        case "long":
            audioEl = document.getElementsByClassName("audio-element-4")[0];
            break;
    }
    audioEl.play();
    audioEl.currentTime = 0;
  }

  //TRACKER
  addToTracker = () => {
    this.setState(prevState => {
      return { trackerTotal: prevState.trackerTotal + 1 }
    });
    ls.set('trackerTotal', this.state.trackerTotal);
  }

  toggleTracker = () => {
      this.setState(prevState => {
          return {
              trackerOn: !prevState.trackerOn
          }
      })
      ls.set('trackerOn', !this.state.trackerOn);
  }

  resetTracker = () => {
      if (this.state.trackerTotal > 0) {
        this.setState({
          trackerTotal: 0,
          trackerHours: 0,
          trackerMins: '00',
          trackerSecs: '00',
          showIndex: 0,
      })
      ls.set('trackerTotal', 0);
    }
  }

  //RESET CONFIRMATION
  showConfirm = () => {
    if (this.state.trackerTotal > 0 && this.state.showIndex !== 6) {
      this.setState({showIndex: 6})
    } else {
      this.setState({showIndex: 0});
    }
  }

  //SAVE ACTIVITY
  showSave = () => {
    if (this.state.showIndex === 4) {
      this.setState({showIndex: 0});
    } else {
      this.setState({showIndex: 4});
    }
  }
  
  addItem = (event) => {
    this.setState({
        activities: this.state.activities.concat(event)
    }, () => ls.set('activities', this.state.activities))
    ls.set('trackerTotal', 0);
    this.resetTracker();
  }

  clearActivities = () => {
    this.setState({ activities: [] });
    ls.set('activities', [] );
  }

  showReset = () => {
    if (this.state.activities.length > 0 && this.state.showIndex !== 7) {
      this.setState({showIndex: 7})
    } else {
      this.setState({showIndex: 0});
    }
  }

  //SETTINGS
  handleSettingsChange = (event) => {
    const {name, value} = event.target
    this.setState({
        [name]: value
    }, () => ls.set([name], value))
    //console.log(this.state.pomLength, this.state.shortBreak, this.state.longBreak, this.state.alarm)
  }

  showMenu = (index) => {
      if (this.state.showIndex === index) {
          this.setState({ showIndex: 0 })
      } else {
          this.setState({ showIndex: index });
      }
  }

  render() {
    let allActivities = this.state.activities.map(item => <ActivityStore key={item.key} item={item} act={item.activity} />)

    return (
      <div className="App">
        <Header
          onClick={this.toggleMode}
          modeIndex={this.state.modeIndex}
        />

      <div className={this.state.modeIndex === 0 ? "timer-cont" : "hide-me"}>
        <Timer 
          addToTracker={this.addToTracker}
          state={this.state}
          playAudio={this.playAudio}
        />
      </div>

      <div className={this.state.modeIndex === 1 ? "stopwatch-cont" : "hide-me"}>
        <Stopwatch 
          modeIndex={this.state.modeIndex}
          showIndex={this.state.showIndex}
          addToTracker={this.addToTracker}
          trackerOn={this.state.trackerOn}
        />
      </div>

      <div className={this.state.showIndex === 6 ? "modal reset-confirm" : "hide-me"}>
        <ResetConfirmation 
          show={this.showConfirm}
          reset={this.resetTracker}
        />
      </div>

      <div>
        <Tracker 
          hours={this.state.trackerHours}
          mins={this.state.trackerMins}
          secs={this.state.trackerSecs}
          toggle={this.toggleTracker}
          reset={this.showConfirm}
          isOn={this.state.trackerOn}
          save={this.showSave}
        />
      </div>

      <div 
        className={this.state.showIndex === 4 ? "modal" : "hide-me"}
        id="save-time">
        <SaveModal  
          close={this.showSave}
          state={this.state}
          save={this.addItem}
        />
      </div>
      
      <div>
        <div className={this.state.activities.length > 0 ? "act-controls" : "hide-me"}>
        {allActivities}
            <div className={this.state.showIndex === 7 ? "modal reset-confirm" : "hide-me"}>
                <ClearAllConfirm 
                    show={this.showReset}
                    reset={this.clearActivities}
            />
            </div>
          <button onClick={this.showReset} title="Clear All">
            <i className="fa fa-trash" id="trash-butt"></i>
          </button>
        </div>
      </div>
          
      <div className="settings-and-about-cont">
          <div className="sett-butt-cont">
              <MenuButton 
                  onClick={this.showMenu}
                  index={1}
                  name="Settings"
                  modeIndex={this.state.modeIndex}
              />
              <MenuButton 
                  onClick={this.showMenu}
                  index={2}
                  name="About"
              />
              {<MenuButton 
                  onClick={this.showMenu}
                  index={3}
                  name="Contact"
              />}
          </div>

          <div className={this.state.showIndex === 1 ? "modal" : "hide-me"}>
              <Settings 
                  state={this.state}
                  onChange={this.handleSettingsChange} 
                  close={this.showMenu}
                  playAudio={this.playAudio}
              />
          </div>

          <div className={this.state.showIndex === 2 ? "about-on" : "hide-me"}>
              <About />
          </div>

          <div className={this.state.showIndex === 3 ? "conts-on" : "hide-me"}>
              <Contact />
          </div>  
        </div>
      </div>
    );
  }
}

export default App;
