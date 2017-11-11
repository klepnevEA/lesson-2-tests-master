import React, {PureComponent} from 'react';
import Comment from './Comment';
import './NewsPost.css';
let idComment = 0;

function getCommentsId () {
  idComment += 1;
  return idComment;  
}

class NewsPost extends PureComponent {
  state = {
    id: 0,
    newsComment : '',
    comment: []
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({newsComment: value});
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
            const {newsComment, comment} = this.state;
            const myComment = {value: newsComment, id: getCommentsId()};
      
            this.setState({newsComment: '', comment: [ ...comment, myComment]});
    }
  };

  handleDelete = (id) => {
    this.setState(state => ({
      comment: state.comment.filter(comment => id != comment.id)
    }));
  };

  render() {
    const {text} = this.props; 
    const {newsComment, comment} = this.state;
    return ( 
      <div>
        <p className="news">{text}</p> 
        <div className="comments-wrap">
          {comment.map(comment => (<Comment onDelete={this.handleDelete} id={comment.id} key={comment.id} text = {comment.value} />))}
        </div>
          
        <input 
          value={newsComment}
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}



export default NewsPost;
