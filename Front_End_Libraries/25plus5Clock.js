const getMinuteFormat = (rawSeconds) => {
  if (rawSeconds >= 0) {
    let minutes = parseInt(rawSeconds / 60);
    let seconds = parseInt(rawSeconds % 60);
    if (minutes < 10) { minutes = '0' + minutes };
    if (seconds < 10) { seconds = '0' + seconds };
    return minutes + ':' + seconds;
  } else { return '00:00'; }
}

const getSeconds = (minuteFormat) => {
  let arr = minuteFormat.split(':')
  return parseInt(arr[0]) * 60 + parseInt(arr[1]);
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      timer: '',
      timerLabel: 'Session',
      paused: true,
      intervalID: ''
    }
    this.reset = this.reset.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.start = this.start.bind(this);
    this.change = this.change.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }
  reset() {
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
    clearInterval(this.state.intervalID);
    this.setState({
      break: 5,
      session: 25,
      timer: '',
      timerLabel: 'Session',
      paused: true,
      intervalID: ''
    })
  }
  breakDecrement() {
    if (this.state.break > 1) {
      this.setState({
        break: this.state.break - 1,
        session: this.state.session,
        timer: this.state.timer,
        paused: this.state.paused
      })
    }
  }
  breakIncrement() {
    if (this.state.break < 60) {
      this.setState({
        break: this.state.break + 1,
        session: this.state.session,
        timer: this.state.timer,
        paused: this.state.paused
      })
    }
  }
  sessionDecrement() {
    if (this.state.session > 1) {
      this.setState({
        break: this.state.break,
        session: this.state.session - 1,
        timer: this.state.timer,
        paused: this.state.paused
      })
    }
  }
  sessionIncrement() {
    if (this.state.session < 60) {
      this.setState({
        break: this.state.break,
        session: this.state.session + 1,
        timer: this.state.timer,
        paused: this.state.paused
      })
    }
  }
  start() {
    if (this.state.intervalID === '' && this.state.timer === '') {
      let seconds = this.state.session * 60;
      let timeID = setInterval(() => {
        seconds--;
        this.setState({
          timer: getMinuteFormat(seconds),
          paused: false,
          intervalID: timeID
        })
      }, 1000)
    } else if (!this.state.paused) {
      clearInterval(this.state.intervalID);
      this.setState({
        paused: true
      })
    } else {
      let seconds = getSeconds(this.state.timer);
      let timeID = setInterval(() => {
        seconds--;
        this.setState({
          timer: getMinuteFormat(seconds),
          paused: false,
          intervalID: timeID
        })
      }, 1000)      
    }
  }
  change() {
    clearInterval(this.state.intervalID);
    if (this.state.timerLabel === 'Session') {
      let seconds = this.state.break * 60;
      let timeID = setInterval(() => {
        this.setState({
          timer: getMinuteFormat(seconds),
          timerLabel: 'Break',
          intervalID: timeID
        })
        seconds--;
      }, 1000)
    } else {
      let seconds = this.state.session * 60;
      let timeID = setInterval(() => {
        this.setState({
          timer: getMinuteFormat(seconds),
          timerLabel: 'Session',
          intervalID: timeID
        })
        seconds--;
      }, 1000)
    }
  }
  playAudio() {
    let audio = document.getElementById('beep');
    audio.play();
  }
  render() {
    return (
      <div id="calc" className="rounded-pill border border-light">
        <div className="row">
          <div id="break-label" className="col-6 h5 rounded"><strong>Break Length</strong></div>
          <div id="session-label" className="col-6 h5 rounded"><strong>Session Length</strong></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div id="break-length" className="col-4"><strong>{this.state.break}</strong></div>
          <div className="col-2"></div>
          <div id="session-length" className="col-4"><strong>{this.state.session}</strong></div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <button id="break-decrement" onClick={this.breakDecrement} className="col-2 btn btn-danger btn-sm"><i class="fas fa-arrow-down"></i></button>
          <button id="break-increment" onClick={this.breakIncrement} className="col-2 btn btn-success btn-sm"><i class="fas fa-arrow-up"></i></button>
          <div className="col-2"></div>
          <button id="session-decrement" onClick={this.sessionDecrement} className="col-2 btn btn-danger btn-sm"><i class="fas fa-arrow-down"></i></button>
          <button id="session-increment" onClick={this.sessionIncrement} className="col-2 btn btn-success btn-sm"><i class="fas fa-arrow-up"></i></button>
          <div className="col-1"></div>
        </div>
        <div className="row mt-5">
          <div className="col-3"></div>
          <div id="timer-label" className="col-6 h4"><strong>{this.state.timer === '00:00' ? this.change() : this.state.timerLabel}</strong></div>
          <div className="col-3"></div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div id="time-left" type="time" className="col-6 rounded-pill" style={{fontSize: 40}}><time id="time-display">{this.state.timer == '' ? (this.state.session < 10 ? '0' + this.state.session + ':00' : this.state.session + ':00') : this.state.timer}</time></div>
          <div className="col-3"></div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <button id="start_stop" onClick={this.start} className="col-3 btn btn-primary btn-lg">{this.state.paused ? <i class="fas fa-play"></i> : <i class="fas fa-pause"></i>}</button>
          <button id="reset" onClick={this.reset} className="col-3 btn btn-light btn-lg"><i class="fas fa-redo-alt"></i></button>
          <div className="col-3"></div>
        </div>
        <audio preload="auto" id="beep" controls="controls" src="https://dl.dropbox.com/s/8q9k6udnb4i13w2/crash.mp3" type="audio/mpeg"></audio>
        {this.state.timer == '00:00' && this.playAudio()}
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('container'));
