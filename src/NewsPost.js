import React, {Component} from 'react';
import Comment from './Comment';
import './NewsPost.css';
let id = 0;

function getNewsId () {
  id += 1;
  return id;  
}

class NewsPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      commentInput : '',
      comments: []
    };
    this.handleChange = this.handleChange.bind(this);  
    this.handleKeyDown = this.handleKeyDown.bind(this);      
    this.handleDelete = this.handleDelete.bind(this); 
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({commentInput: value});
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13  && event.target.value !== '') {
            const {commentInput, comments} = this.state;
            const comment = {value: commentInput, id: getNewsId()};
      
            this.setState({commentInput: '', comments: [ ...comments, comment]});
    }
  };

  handleDelete = (id) => {
    this.setState(state => ({
      comments: state.comments.filter(comments => id !== comments.id)
    }));
  };

  render() {
    const {text} = this.props; 
    const {commentInput, comments} = this.state;
    return ( 
      <div>
        <p className="news">{text}</p> 
        <div className="comments-wrap">
          {comments.map(comments => (<Comment onDelete={this.handleDelete} id={comments.id} key={comments.id} text = {comments.value} />))}
        </div>
          
        <input 
          value={commentInput}
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}



export default NewsPost;
