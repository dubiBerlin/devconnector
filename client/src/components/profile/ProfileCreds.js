
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profileActions";
import Moment from "react-moment";


class ProfileAbout extends Component {

    render() {

        const { experience, education } = this.props;
        const expItems = experience.map(exp => (
            <li key={exp._id} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ("Now") : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                </p>
                <p><strong>Position:</strong>{exp.title}</p>
                <p>
                    {exp.location === "" ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
                </p>
                <p>
                    {exp.description === "" ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
                </p>
            </li>
        ));


        const eduItems = education.map(edu => (
            <li key={edu._id} className="list-group-item">
                <h4>{edu.company}</h4>
                <p>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? ("Now") : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                </p>
                <p><strong>Degree:</strong>{edu.title}</p>
                <p>
                    <strong>Field of study: </strong>{edu.fieldofstudy}
                </p>
                <p>
                    {edu.description === "" ? null : (<span><strong>Description: </strong>{edu.description}</span>)}
                </p>
            </li>
        ));

        return (
            <div class="row">
                <div class="col-md-6">
                    <h3 class="text-center text-info">Experience</h3>
                    {expitems.length > 0 ? (
                        <ul class="list-group">
                            {expItems}
                        </ul>) : (<p className="text-center">No experience Listed</p>)}
                </div>
                <div class="col-md-6">
                    <h3 class="text-center text-info">Education</h3>
                    {eduitems.length > 0 ? (
                        <ul class="list-group">
                            {eduItems}
                        </ul>) : (<p className="text-center">No Education Listed</p>)}
                </div>
            </div>)
    }


}

export default ProfileAbout;