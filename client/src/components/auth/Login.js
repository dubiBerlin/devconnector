import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {


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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    onSubmit(e) {
        e.preventDefault();


        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);

    }

    render() {

        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
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


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);