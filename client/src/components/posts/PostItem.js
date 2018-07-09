
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";
import classnames from "classnames";


class PostItem extends Component {

    constructor(props) {
        super(props),
            this.state = {
                text: ""
            };

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }



    render() {

        const { post, auth } = this.state;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to={`/post/${post._id}`}>
                            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                                alt={post.alt} />
                        </Link>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">
                            {post.text}
                        </p>
                        <button type="button" onClick={this.onLikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                            <i className="text-info fas fa-thumbs-up"></i>
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button type="button" onClick={this.onUnlikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>
                        {post.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1"> < i className="fas fa-times" /></button>) : null};
                    </div>
                </div>
            </div>
        )
    }


}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);