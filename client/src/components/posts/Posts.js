
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";

class Posts extends Component {


    render() {


        const { profile } = this.props;

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                        </div >
                    </div >
                </div >
            </div >
        )
    }


}

export default Posts;