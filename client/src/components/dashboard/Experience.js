import React, { Component } from "react";
import { connect } from "react-redux";
//import classnames from "classnames";
import PropTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link, withRouter } from "react-router-dom";

class Experience extends Component {
    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{exp.from} - {exp.to}</td>
                <td><button className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4>Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    {experience}
                </table>
            </div>
        )
    }


}

export default connect(null)(withRouter(Experience));