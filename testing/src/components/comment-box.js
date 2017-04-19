/**
 * Created by chintan on 11/24/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class CommentBox extends Component {

    constructor(props) {
        super(props);

        this.state = {comment: ''};
    }
    onHandleChange(event) {
        this.setState({comment: event.target.value});
    }

    onHandleSubmit(event) {
        event.preventDefault();
        this.props.saveComment(this.state.comment);
        this.setState({comment: ''});
    }
    render() {
        return (
            <form onSubmit={this.onHandleSubmit.bind(this)}
                  className="comment-box">
                <h4>Add a comment</h4>
                <textarea
                    value={this.state.comment}
                    onChange={this.onHandleChange.bind(this)} />
                <div>
                    <button action="submit">Submit component</button>
                </div>
            </form>
        );
    }
}

export default connect(null, actions)(CommentBox);