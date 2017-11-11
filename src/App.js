import React, {PureComponent} from 'react';
import NewsPost from './NewsPost';
let id = 0;

function getNewsId () {
  id += 1;
  return id;  
}


class App extends PureComponent {
  state = {
    news : [],
    newsInput : ''
  };

    handleChange = (event) => {
      const value = event.target.value;
      this.setState({newsInput: value});
    };

    handleKeyDown = (event) => {
      

      if (event.keyCode === 13) {
              const {newsInput, news} = this.state;
              const newNews = {value: newsInput, id: getNewsId()};
        
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
        <div className="NewsPost">
          {news.map(news => <NewsPost id={news.id} key={news.id} text = {news.value} />)}
        </div>

      </div>
    );
  }
}

export default App;
