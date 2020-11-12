class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0,
      output: 0
    }
    this.clearAll = this.clearAll.bind(this);
    this.typeNumber = this.typeNumber.bind(this);
    this.action = this.action.bind(this);
    this.getEqual = this.getEqual.bind(this);
    this.toDecimal = this.toDecimal.bind(this);
  }
  clearAll() {
    this.setState({
      input: 0,
      output: 0
    })
  }
  typeNumber() {
    if (this.state.input == 0 && !(/\./).test(this.state.input)) {
      this.setState({
        input: event.target.innerText,
        output: this.state.output
      })
    } else {
      this.setState({
        input: this.state.input.toString().concat(event.target.innerText),
        output: this.state.output
      })
    }
  }
  action() {
    const arr = this.state.input.toString().split('');
    let negativeNumber = false;
    if ((/\d[\\\+\*\-]$/).test(this.state.input.toString()) && event.target.innerText == '-') {
      negativeNumber = true;
    }
    if ((/\D$/).test(this.state.input.toString()) && !(/\.$/).test(this.state.input.toString()) && !negativeNumber) {
      while ((/[\+\-\*\\/]$/).test(arr[arr.length - 1])) {
        arr.pop();      
      }
    }
    this.state.input = arr.join('');
    if (event.target.innerText == '-' && this.state.input.toString().slice(-1) == '-') {
      this.setState({
        input: this.state.input.toString().concat(' ', event.target.innerText),
        output: 0
      })
    } else {
      this.setState({
        input: this.state.input.toString().concat(event.target.innerText),
        output: 0
      })
    }
  }
  getEqual() {
    let result = this.state.input.toString();
    this.setState({
      input: Math.round(eval(result) * 10000) / 10000,
      output: 0
    })
  }
  toDecimal() {
    if ((/\./).test(this.state.input.toString())) {
      const arr = this.state.input.toString().split(/[\+\-\*\\]/);
      if ((/\./).test(arr[arr.length - 1])) {
        return true;
      }
    }
    this.setState({
      input: this.state.input.toString().concat(event.target.innerText),
      output: this.state.output
    })
  }
  render() {
    return (
      <div id="calc" className="d-flexbox justify-content-center align-items-center">
        <div className="row"><div id="display" className="col-12 key">{this.state.output == 0 ? this.state.input : this.state.output}</div></div>
        <div className="row"><button id="clear" onClick={this.clearAll} className="col-9 key btn btn-danger">AC</button><button id="divide" onClick={this.action} className="col-3 key btn-dark">/</button></div>
        <div className="row"><button id="seven" onClick={this.typeNumber} className="col-3 key btn btn-light">7</button><button id="eight" onClick={this.typeNumber} className="col-3 key btn btn-light">8</button><button id="nine" onClick={this.typeNumber} className="col-3 key btn btn-light">9</button><button id="multiply" onClick={this.action} className="col-3 key btn-info">*</button></div>
        <div className="row"><button id="four" onClick={this.typeNumber} className="col-3 key btn btn-light">4</button><button id="five" onClick={this.typeNumber} className="col-3 key btn btn-light">5</button><button id="six" onClick={this.typeNumber} className="col-3 key btn btn-light">6</button><button id="subtract" onClick={this.action} className="col-3 key btn-warning">-</button></div>
        <div className="row"><button id="one" onClick={this.typeNumber} className="col-3 key btn btn-light">1</button><button id="two" onClick={this.typeNumber} className="col-3 key btn btn-light">2</button><button id="three" onClick={this.typeNumber} className="col-3 key btn btn-light">3</button><button id="add" onClick={this.action} className="col-3 key btn-success">+</button></div>
        <div className="row"><button id="zero" onClick={this.typeNumber} className="col-6 key btn btn-light">0</button><button id="decimal" onClick={this.toDecimal} className="col-3 key btn btn-outline-secondary">.</button><button id="equals" onClick={this.getEqual} className="col-3 key btn-primary">=</button></div>
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('container'));
