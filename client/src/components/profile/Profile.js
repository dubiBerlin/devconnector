
import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/Spinner";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

class Profile extends Component {

    componentWillMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    render() {
        return (
            <div>
                <ProfileHeader />
                <ProfileAbout />
                <ProfileCreds />
                <ProfileGithub />
            </div>
        )
    }


}


const mapStateToProps = state => ({
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
})


export default connect(mapStateToProps, { getProfileByHandle })(Profile);