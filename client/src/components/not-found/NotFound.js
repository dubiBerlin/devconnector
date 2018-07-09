
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

export default () => {
    return (
        <div>
            <h1 className="display-4">Page Not Found</h1>
            <p>Sorry, this page does not exist</p>
        </div>
    )
}