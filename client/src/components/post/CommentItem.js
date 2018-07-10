
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, addLike, removeLike } from "../../actions/postActions";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";
import classnames from "classnames";


class CommentItem extends Component {

    onDeleteClick(postid, commentId) {
        this.props.deleteComment(postid, commentId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    findUserLike(likes) {
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {

        const { comment, auth, postId } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                        </a>
                        <br />
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                    </div>
                    {comment.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this, comment._id)} type="button" className="btn btn-danger mr-1"> < i className="fas fa-times" /></button>) : null}
                </div>
            </div>
        )
    }
}

CommentItem.defaultProps = {
    showActions: true
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);