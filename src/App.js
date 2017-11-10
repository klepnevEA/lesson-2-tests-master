import React, {PureComponent} from 'react';

let id = 0;
let idComment = 0;
function getNewsId () {
  id += 1;
  return id;  
}

function getCommentsId () {
  idComment += 1;
  return idComment;  
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

class NewsPost extends PureComponent {
  state = {
    id: 0,
    newsComments : '',
    comments: []
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({newsComments: value});
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
            const {newsComments, comments} = this.state;
            const myComments = {value: newsComments, id: getCommentsId()};
      
            this.setState({newsComments: '', comments: [ ...comments, myComments]});
    }
  };

  handleDelete = (id) => {
    this.setState(state => ({
      comments: state.comments.filter(comments => id != comments.id)
    }));
  };

  render() {
    const {text} = this.props; 
    const {newsComments, comments} = this.state;
    return ( 
      <div>
        <p className="news">{text}</p> 
        <div className="comments-wrap">
          {comments.map(comments => (<Comments onDelete={this.handleDelete} id={comments.id} key={comments.id} text = {comments.value} />))}
        </div>
          
        <input 
          value={newsComments}
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

class Comments extends PureComponent {

  handleDelete = () => {
    const {id, onDelete} = this.props;
    onDelete(id);
  }

  render() {
    const {text} = this.props;  
    return (<p className="comments">{text} <span onClick={this.handleDelete} className="delete">X</span></p>   );
  }
}


export default App;
