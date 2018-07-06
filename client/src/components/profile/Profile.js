
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
        const { profile, loading } = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <Spinner />
        }
        else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left" />
                        </div>
                        <div className="col-md-6" />

                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout />
                    <ProfileCreds />
                    <ProfileGithub />
                </div>
            )
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}


const mapStateToProps = state => ({
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
})


export default connect(mapStateToProps, { getProfileByHandle })(Profile);