import React, {Component} from 'react';
import NewsPost from './NewsPost';
let id = 0;

function getNewsId () {
  id += 1;
  return id;  
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news : [],
      newsInput : '',
    };
    this.handleChange = this.handleChange.bind(this);  
    this.handleKeyDown = this.handleKeyDown.bind(this);  
  };

    handleChange = (event) => {
      const value = event.target.value;
      this.setState({newsInput: value});
    };

    handleKeyDown = (event) => {
      const {newsInput, news} = this.state;
      if (event.keyCode === 13 && newsInput) {
        
        const newNews = {text: newsInput, id: getNewsId()};
        this.setState({newsInput: '', news: [ ...news, newNews]});
      }

    };

  render() {
    const {newsInput, news} = this.state;
    return (
      <div className="App">
        <input 
          value={newsInput}
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
        />
        {news.map(news => <NewsPost key={news.id} text = {news.text} />)}

      </div>
    );
  }
}

export default App;
