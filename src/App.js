import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SignIn, withAuthenticator} from 'aws-amplify-react';
import {
    Auth,
    I18n,
    Logger,
    JS
} from 'aws-amplify';

class MySignIn2 extends SignIn {
       constructor(props) {
        super(props);

        this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
        this.state = {
            username: null,
            password: null,
            error: null
        }

        this.checkContact = this.checkContact.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                // logger.debug('verified user attributes', data);
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                } else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            });
    }

    signIn() {
        const { username, password } = this.state;
        //logger.debug('Sign In for ' + username);
        Auth.signIn(username, password)
            .then(user => {
                // logger.debug(user);
                const requireMFA = (user.Session !== null);
                if (user.challengeName === 'SMS_MFA') {
                    this.changeState('confirmSignIn', user);
                } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    // logger.debug('require new password', user.challengeParam);
                    this.changeState('requireNewPassword', user);
                } else {
                    this.checkContact(user);
                }
            })
            .catch(err => this.error(err));
    }
   
    handleUsername(event) {
        this.setState({ username : event.target.value})
    }
    handlePassword(event) {
        this.setState({ password : event.target.value})
    }
    handleSubmit(event) {
        alert('DATA: ' + this.state.username + " : " + this.state.password);
        this.signIn();
        alert("State : " + this.props.authState);
    }
  render() {
    if (this.props.authState !== 'signIn') {
      return null;
    }
    return (
    <div>
        <h1>Sign In</h1>
    <form onSubmit={this.handleSubmit}>
    <label>
        Username:
        <input type="text" id="username" value={this.state.username} onChange={this.handleUsername} />
    </label>
    <br/>
    <label>
        Password:
        <input type="text" id="password" value={this.state.password} onChange={this.handlePassword} />
    </label>
    <br/>
    <input type="submit" value="Submit" />
    </form>
    </div>
    );
  }
}

class App extends Component {
  render() {
      // if (this.props.authState === "signedIn")
       return(
            <h1>Sprouts Application</h1>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true }, [
   <MySignIn2/>
]);
