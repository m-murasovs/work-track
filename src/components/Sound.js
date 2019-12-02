import React from 'react';

  const Sound = (props) => {
    return (
      <div>
        <audio className="audio-element-1">
          <source src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"></source>
        </audio>
        <audio className="audio-element-2">
          <source src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"></source>
        </audio>
        <audio className="audio-element-3">
          <source src="https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"></source>
        </audio>
        <audio className="audio-element-4">
          <source src="https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg"></source>
        </audio>
      </div>
    )
  }

  export default Sound;