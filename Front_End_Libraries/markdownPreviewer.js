class MarkdownExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '# Heading\n## Subheading\n\n[A link to master Markdown](https://guides.github.com/features/mastering-markdown/)\n\n`Some inline code`\n\
```\nAnd a code block\n```\n1. An\n1. Ordered\n1. List\n\n> A blockquote\n\n![GitHub Logo](/images/logo.png)\n\n**That\'s all for now!**'
    }
    this.getMarkdownText = this.getMarkdownText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.setState({
      text: event.target.value
    });
  }
  getMarkdownText(text) {
    var rawMarkup = marked(text, {sanitize: true});
    return { __html: rawMarkup };
  }
  render() {
    const markdownText = this.getMarkdownText(this.state.text);
    return (
      <div>
        <div class="col-md-4">
          <textarea id="editor" class="form-control" rows="20" placeholder="Type your Markdown here..." value={this.state.text} onChange={this.handleChange}></textarea></div>
        <div class="col-md-2"></div>
        <div id="preview" class="col-md-4 well" dangerouslySetInnerHTML={markdownText} />
        <div class="col-md-1"></div>
    </div>
    );
  }
}

ReactDOM.render(<MarkdownExample />, document.getElementById('previewer'));
