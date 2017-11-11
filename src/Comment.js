import React, {Component} from 'react';
import './Comment.css';
class Comment extends Component {

  handleDelete = () => {
    const {id, onDelete} = this.props;
    onDelete(id);
  }

  render() {
    const {text} = this.props;  
    return (<p className="comment">{text} <span onClick={this.handleDelete} className="delete">X</span></p>   );
  }
}


export default Comment;
