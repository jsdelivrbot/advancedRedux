/**
 * Created by chintan on 11/24/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

const CommentList = (props) => {

    const lists = props.comments.map(comment => <li key={comment}> {comment}</li>);
    return (
        <ul className="comment-list">{lists}</ul>
    );

};

function mapStateToComments(state) {
    return { comments: state.comments};
}
export default connect(mapStateToComments)(CommentList);