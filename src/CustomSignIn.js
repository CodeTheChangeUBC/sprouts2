import React from 'react';
import { SignIn } from 'aws-amplify-react';
import { Auth, JS } from 'aws-amplify';
import { formStyle, sectionFooter } from './App';
export class CustomSignIn extends SignIn {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
        this.state = {
            username: null,
            password: null,
            error: null
        };
        this.checkContact = this.checkContact.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleConfirmSignUp = this.handleConfirmSignUp.bind(this);
    }
    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                // Logger.debug('verified user attributes', data);
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                }
                else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            });
    }
    signIn() {
        const { username, password } = this.state;
        // Logger.debug('Sign In for ' + username);
        Auth.signIn(username, password)
            .then(user => {
                alert("Login success");
                const requireMFA = (user.Session !== null);
                if (user.challengeName === 'SMS_MFA') {
                    this.changeState('confirmSignIn', user);
                }
                else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    // Logger.debug('require new password', user.challengeParam);
                    this.changeState('requireNewPassword', user);
                }
                else {
                    this.checkContact(user);
                }
            })
            .catch(err => {
                this.error(err);
            })
    }
    handleConfirmSignUp(event) {
        this.changeState("confirmSignUp");
    }
    handleSignUp(event) {
        this.changeState("signUp");
    }
    handleUsername(event) {
        this.setState({ username: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        alert('DATA: ' + this.state.username + " : " + this.state.password);
        this.signIn();
    }
    render() {
        if (this.props.authState !== 'signIn') {
            return null;
        }
        return (<div style={formStyle}>
            <h1>Sign In</h1>
            <form onSubmit={this.handleSubmit}>
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
                <input type="submit" value="Submit" />
            </form>
            <button onClick={this.handleSignUp} value="Sign Up">Sign Up</button>
            {/* <button onClick={this.handleConfirmSignUp} value="Confirm Code">Confirm Code</button> */}

        </div>)
    }
}