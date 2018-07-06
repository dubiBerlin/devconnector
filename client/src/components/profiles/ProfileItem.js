
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";

class ProfileItem extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profile, loading } = this.props;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <Spinner />
        }
        else {
            if (profiles.length > 0) {
                profileItems = <h1>PROFILES HERE</h1>
            } else {
                profileItems = <h4>No profiles found ...</h4>
            }
        }

        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">

                    <div className="col-2">
                        <img src={profile.user.avatar} alt="" className="rounded-circle" />
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3 >{profile.user.name}</h3>
                            <h1 className="display-4 text-center">Developer Profiles</h1>

                            <p>
                                {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
                            </p>
                            <p>
                                {isEmpty(profile.location) ? null : (<span> {profile.location}</span>)}
                            </p>
                            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                                View ProfileItem
                            </Link>
                        </div>
                        <div className="col-md-4 d-none d-md-block">
                            <h4>Skill set</h4>
                            <ul className="list-group">
                                {profile.skills.slice(0, 4).mkap((skill, index) => (
                                    <li key={index} className="list-group-item">
                                        <i className="fa fa-check pr-1" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


Profiles.PropTypes = {
    profile: PropTypes.object.isRequired
}

const mapstateToProps = state => {
    profile: state.profile
}

export default connect(mapStateToProps, { getProfiles })(withRouter(ProfileItem));
