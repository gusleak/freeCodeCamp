const letterStyle = {
  fontWeight: 'bold',
  fontSize: 30,
  fontFamily: 'sans',
  color: 'black'
}

const noteStyle = {
  fontSize: 20,
  fontFamily: 'Impact'
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: '',
      play: ''
    }
    this.playNote = this.playNote.bind(this);
  }
  playNote() {
    this.setState({
      key: event.target.innerText,
      play: event.target.id
    })
    const audio = document.getElementById(event.target.innerText);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
  render() {
    return (
      <div id="display">
        <div className="row">
          <button onClick={this.playNote} id="China" className="drum-pad btn btn-primary col-xs-3" style={letterStyle}>Q<audio preload="auto" id="Q" className="clip" controls="controls" src="https://dl.dropbox.com/s/ag9tww45v0aty9j/china.mp3" type="audio/mpeg"></audio></button>
          <button onClick={this.playNote} id="Crash" className="drum-pad btn btn-primary col-xs-3" style={letterStyle}>W<audio preload="auto" id="W" className="clip" controls="controls" src="https://dl.dropbox.com/s/8q9k6udnb4i13w2/crash.mp3" type="audio/mpeg"></audio></button>
          <button onClick={this.playNote} id="Splash" className="drum-pad btn btn-primary col-xs-3" style={letterStyle}>E<audio preload="auto" id="E" className="clip" controls="controls" src="https://dl.dropbox.com/s/3vc6hn8xmuj1loa/splash.mp3" type="audio/mpeg"></audio></button>
        </div>
        <div className="row">
          <button onClick={this.playNote} id="Floor tom drum" className="drum-pad btn btn-info col-xs-3" style={letterStyle}>A<audio preload="auto" id="A" className="clip" controls="controls" src="https://dl.dropbox.com/s/vnelzmfg7a780ub/floor-tom-drum.mp3" type="audio/mpeg"></audio></button>
          <button onClick={this.playNote} id="Snare" className="drum-pad btn btn-info col-xs-3" style={letterStyle}>S<audio preload="auto" id="S" className="clip" controls="controls" src="https://dl.dropbox.com/s/xwgfdist69415nu/snare.mp3" type="audio/mpeg"></audio></button>
          <button onClick={this.playNote} id="Medium tom drum" className="drum-pad btn btn-info col-xs-3" style={letterStyle}>D<audio preload="auto" id="D" className="clip" controls="controls" src="https://dl.dropbox.com/s/y6k4mv8tvnj8y4g/medium-tom-drum.mp3" type="audio/mpeg"></audio></button>
          <div id="note" className="col-xs-2" style={noteStyle}>{this.state.play}</div>
        </div>
        <div className="row">
          <button onClick={this.playNote} id="Ride" className="drum-pad btn btn-warning col-xs-3" style={letterStyle}>Z<audio preload="auto" id="Z" className="clip" controls="controls" src="https://dl.dropbox.com/s/f4q5w3q7e2ur9pe/ride.mp3" type="audio/mpeg"></audio></button>
          <button onClick={this.playNote} id="Bass drum" className="drum-pad btn btn-warning col-xs-3" style={letterStyle}>X<audio preload="auto" id="X" className="clip" controls="controls" src="https://dl.dropbox.com/s/i45251570rlrtde/bass-drum.mp3" type="audio/mpeg"></audio></button>
          <button onClick={this.playNote} id="Drum sticks" className="drum-pad btn btn-warning col-xs-3" style={letterStyle}>C<audio preload="auto" id="C" className="clip" controls="controls" src="https://dl.dropbox.com/s/jh573jv8xma7vv0/drum-sticks.mp3" type="audio/mpeg"></audio></button>
      </div>
      </div>
    )
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById('drum-machine'));
