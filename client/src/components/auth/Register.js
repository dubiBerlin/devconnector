import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this); // man bindet die onchange Methode an den state. somit wird "this.setState" erkannt
        this.onSubmit = this.onSubmit.bind(this); // man bindet die onchange Methode an den state. somit wird "this.setState" erkannt
    }


    // Läuft jedesmal wenn die Komponente neue Props bekommt
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history);
    }

    /*
    * componentDidMount()
    * Nachdem die Komponente gebaut wurde, wird ddiese Methode aufgerufen
    * Der Code wird nach dem erstellen der Komponente ausgeführt
    * 
    * Aufgabe der Methode:
    *  Wenn der User eingeloggt ist, soll sofort zur Dashbord Seite hinnavigiert werden */
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard")
        }
    }

    render() {

        const errors = this.state.errors;
        //const user = this.props.auth.user;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit} >

                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use Gravatar email"
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    placeholder="Confirm Password"
                                    name="password2"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

// bindet den state an die props der Komponente
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

// connect: bindet die Action an die Komponente
// {registerUser} ist die Funktion/Aktion aus der Datei authAction
// mapStateToProps = die Methode die den state an die props bindet
// withRouter die Navigation wird an die Komponente gebunden
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
