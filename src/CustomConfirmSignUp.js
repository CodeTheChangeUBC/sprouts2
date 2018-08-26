import React from 'react';
import { ConfirmSignUp } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { formStyle } from './App';
export class CustomConfirmSignUp extends ConfirmSignUp {
    constructor(props) {
        super(props);
        this._validAuthStates = ['confirmSignUp'];
        this.state = {
            username: null,
            code: null,
            error: null
        };
        this.confirm = this.confirm.bind(this);
        this.resend = this.resend.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleResend = this.handleResend.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    confirm() {
        const { username, code } = this.state;
        Auth.confirmSignUp(username, code)
            .then(data => {this.changeState('signedUp');
        alert("Successfully signed up");})
            .catch(err => {this.error(err); 
            alert("Please try again");});
    }
    resend() {
        const { username } = this.state;
        Auth.resendSignUp(username)
            .then(() => alert("code resent"))
            .catch(err => {alert("Unsuccessful: Please check your username");
                        this.error(err);});
    }
    componentWillReceiveProps(nextProps) {
        const username = nextProps.authData;
        if (username && !this.state.username) {
            this.setState({ username });
        }
    }
    handleResend(event) {
        this.resend();
    }
    handleConfirm(event) {
        this.confirm();
    }
    handleSignIn(event) {
        this.changeState("signIn");
    }
    handleCode(event) {
        this.setState({ code: event.target.value });
    }
    handleUsername(event) {
        this.setState({ username: event.target.value });
    }
    showComponent() {
        return (<div style={formStyle}>
            <h1>Confirm Sign Up</h1>
            <form>
                <label>
                    Username:
                            <input type="text" id="username" value={this.state.username} onChange={this.handleUsername} />
                </label>
                <br />
                <label>
                    Confirmation Code:
                                <input type="text" id="confCode" value={this.state.code} onChange={this.handleCode} />
                </label>
                <br />
                <button onClick={this.handleConfirm} disabled={!this.state.username || !this.state.code} value="Confirm">Confirm</button>
                <button onClick={this.handleResend} disabled={!this.state.username} value="Resend">Resend Code</button>
            </form>
            <button onClick={this.handleSignIn} value="Sign In">Back to Sign In</button>

        </div>);
    }
}