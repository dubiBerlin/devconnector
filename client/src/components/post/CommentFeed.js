
import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { comments, postId } = this.props;
        return comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />);

    }
}

PostFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
}


export default CommentFeed;