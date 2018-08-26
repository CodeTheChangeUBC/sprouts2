import React, { Component } from 'react';
import './App.css';
import { ConfirmSignUp, withAuthenticator } from 'aws-amplify-react';
import {
    Auth,
    I18n,
    Logger} from 'aws-amplify';
import { CustomSignIn } from './CustomSignIn';
import { CustomSignUp } from './CustomSignUp';

export const formStyle = {
    color: "teal", 
    backgroundColor: "orange", 
    textAlign: "center", 
    height: "100vh", 
    paddingTop: "100px"
}

export const sectionFooter = {
    color: "white",
    padding: '10px 15px',
    borderTop: '1px solid #ddd',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px'
}

class CustomConfirmSignUp extends ConfirmSignUp {
    constructor(props) {
        super(props);

        this._validAuthStates = ['confirmSignUp'];
        this.state = {
            username: null,
            code: null,
            error: null
        }

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
            .then(data => this.changeState('signedUp'))
            .catch(err => this.error(err));
    }

    resend() {
        const { username } = this.state;
        Auth.resendSignUp(username)
            .then(() => true)
            .catch(err => this.error(err));
    }

    componentWillReceiveProps(nextProps) {
        const username = nextProps.authData;
        if (username && !this.state.username) { this.setState({ username }); }
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
        this.setState({code: event.target.value});
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }
    showComponent() {
        return (
            <div style={formStyle}>
                <h1>Confirm Sign Up</h1>
                <form>
                    <label>
                        Username:
                            <input type="text" id="username" value={this.state.username} onChange={this.handleUsername} />
                    </label>
                    <br/>
                    <label>
                        Confirmation Code:
                                <input type="text" id="confCode" value={this.state.code} onChange={this.handleCode} />
                    </label>
                    <br/>
                    <button
                        onClick={this.handleConfirm}
                        disabled={!this.state.username || !this.state.code}
                        value="Confirm">Confirm</button>
                    <button
                        onClick={this.handleResend}
                        disabled={!this.state.username}
                        value="Resend">Resend Code</button>
                </form>
                <button onClick={this.handleSignIn} value="Sign In">Back to Sign In</button>

            </div>
        );
    }
}



class App extends Component {
  render() {
       return(
           <div>
            <h1>Sprouts Application</h1>
            </div>
    );
  }
}

export default withAuthenticator(App, {includeGreetings:true}, [
   <CustomSignIn/>,
   <CustomSignUp/>,
   <CustomConfirmSignUp/>,
]);
