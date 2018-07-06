import React, { Component } from "react";
import { connect } from "react-redux";
//import classnames from "classnames";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileAction";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile == null || loading === true) {
            dashboardContent = <Spinner />;
        } else {
            // Überprüfen ob user ein Profil erstellt hat
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
                        </p>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        {/* TODO: exp and edu */}
                        <div style={{ marginBottom: "60px" }} />
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
                    </div>
                );
            } else {
                // User is logged in but has no profile

                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You must create a profile please</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create profile</Link>
                    </div>
                )

            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mayStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mayStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);