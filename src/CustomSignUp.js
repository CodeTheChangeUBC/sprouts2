import React from 'react';
import { SignUp } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { formStyle } from './App';

export class CustomSignUp extends SignUp {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signUp'];
        this.state = {
            name: null,
            username: null,
            password: null,
            email: null
        };
        this.signUp = this.signUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }
    signUp() {
        const { username, password, email, phone_number } = this.state;
        Auth.signUp(username, password, email, phone_number)
            .then(data => {
                alert("Please check your email for your confirmation code")
                this.changeState('confirmSignUp', username);
            })
            .catch(err => this.error(err));
    }
    handleName(event) {
        this.setState({ name: event.target.value });
    }
    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleUsername(event) {
        this.setState({ username: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        alert('Signing Up: ' + this.state.username + " : " + this.state.name);
        this.signUp();
        alert("State : " + this.props.authState);
    }
    showComponent() {
        return (<div style={formStyle}>
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
        <input type="text" id="name" value={this.state.name} onChange={this.handleName} />
                </label>
                <br />
                <label>
                    Username:
        <input type="text" id="username" value={this.state.username} onChange={this.handleUsername} />
                </label>
                <br />
                <label>
                    Password:
        <input type="text" id="password" value={this.state.password} onChange={this.handlePassword} />
                </label>
                <br />
                <label>
                    Email:
        <input type="text" id="email" value={this.state.email} onChange={this.handleEmail} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>);
    }
}