class MyQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomIndex: Math.floor(Math.random() * 11)
    }
    this.getQuote = this.getQuote.bind(this);
  }
  getQuote() {
    this.setState({
      randomIndex: Math.floor(Math.random() * 11)
    });
  }
  render () {
    const quotes = [
      ['Enjoyment is not a goal, it is a feeling that accompanies important ongoing activity.', 'Paul Goodman'],
      ['If you make people think they\'re thinking, they\'ll love you; But if you really make them think, they\'ll hate you.', 'Don Marquis'],
      ['The world is round; it has no point.', 'Adrienne E. Gusoff'],
      ['I don\'t know the key to success, but the key to failure is trying to please everybody.', 'Bill Cosby'],
      ['Life is a moderately good play with a badly written third act.', 'Truman Capote'],
      ['Normal is not something to aspire to, it\'s something to get away from.', 'Jodie Foster'],
      ['The graveyards are full of indispensable men.', 'Charles de Gaulle'],
      ['Never despair; but if you do, work on in despair.', 'Edmund Burke'],
      ['If everything seems under control, you are not going fast enough.', 'Mario Andretti'],
      ['Jealousy is the tribute mediocrity pays to genius.', 'Fulton J. Sheen'],
      ['To win without risk is to triumph without glory.', 'Pierre Corneille']
    ];
    const quote = quotes[this.state.randomIndex];
    return (
      <div className="well">
        <h2 id="text">{quote[0]}</h2>
        <h4 id="author">{quote[1]}</h4>
        <div className="row">
          <a id="tweet-quote" href="https://twitter.com/intent/tweet"><i class="fab fa-twitter fa-3x col-xs-7"></i></a>
          <div className="col-xs-1"></div>
          <button id="new-quote" className="btn btn-primary col-xs-1" onClick={this.getQuote}>New Quote</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyQuote />, document.getElementById('quote-box'));
