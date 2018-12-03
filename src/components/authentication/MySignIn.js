import React from 'react';
import { SignIn } from 'aws-amplify-react';
import { Auth, I18n } from 'aws-amplify';

import logo from '../../sprouts_logo.png';

export class MySignIn extends SignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signIn'];
    this.state = {
      email: "",
      password: ""
    };
    this.signIn = this.signIn.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  signIn() {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          //TODO: fix require new password page
          console.log('require new password', user.challengeParam);
          this.changeState('requireNewPassword', user);
        } else {
          this.checkContact(user);
          window.location.reload();
        }
      })
      // .then(window.location.reload())
      .catch(err => {
        if (err.code === 'UserNotConfirmedException') {
          console.log('the user is not confirmed');
          alert("Please check your email and verify your account before signing in.")
        } else {
          this.error(err);
        }
      });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  showComponent() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center my-3">
            <div className="mb-4">
              <img src={logo} alt="logo" width={300/1.5} height={143/1.5}/>
              <h5 className="mt-2">Sign in with your Sprouts Account</h5>
            </div>
            <form>
              <div className="form-group">                  
                <h6 className="text-left mb-0">Username or Email</h6>
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="email" id="username" key="username" name="username" onChange={ this.handleEmail }/>
              </div>
              <div className="form-group">
                <h6 className="text-left mb-0">Password</h6>
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="password" id="password" key="password" name="password" onChange={ this.handlePassword }/>
              </div>
              <div className="py-1">
                <button type="button" className="btn btn-block rounded-0 btn-primary" onClick={ this.signIn } value="Sign In" >{ I18n.get('Sign In') }</button>
              </div>
            </form>
            <div className="py-1">
              <button type="button" className="btn btn-block rounded-0 btn-primary text-white" onClick={ () => this.changeState('signUp') }>
                {I18n.get('Create Account')}
              </button>
            </div>
            <div className="py-1">
              <button type="button" className="btn btn-link" onClick={() => this.changeState('forgotPassword')}>
                {I18n.get('Forgot password?')}
              </button>
            </div>
            <div className="mt-5">
              <p className="text-muted small">&copy; 2018 Sprouts UBC. Developed by <a className="text-muted" href="http://codethechange.ca">Code the Change Foundation</a>.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}