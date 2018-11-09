import React from 'react';
import { ConfirmSignUp } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

export class MyConfirmSignUp extends ConfirmSignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ['confirmSignUp'];
    this.state = {
      username: "",
      code: "",
      error: ""
    };
    this.confirm = this.confirm.bind(this);
    this.resend = this.resend.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleResend = this.handleResend.bind(this);
  }

  confirm() {
    const { username, code } = this.state;
    Auth.confirmSignUp(username, code)
      .then(data => {
        this.changeState('signedUp');
        alert("Successfully signed up");
      })
      .catch(err => {
        this.error(err);
      }
      );
  }
  
  resend() {
    const { username } = this.state;
    Auth.resendSignUp(username)
      .then(() => alert("code resent"))
      .catch(err => {
        this.error(err);}
      );
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
  
  handleCode(event) {
    this.setState({ code: event.target.value });
  }
  
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  
  showComponent() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center my-3">
            <h1>Confirm Sign Up</h1>
            <form>
              <div className="form-group">
                <input type="text" className="form-control rounded-0 border-left-0 border-right-0 border-top-0" id="username" placeholder="Username" value={this.state.username} onChange={this.handleUsername} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control rounded-0 border-left-0 border-right-0 border-top-0" id="confCode" placeholder="Confirmation Code" value={this.state.code} onChange={this.handleCode} />
              </div>
              <div className="py-1">
                <button onClick={this.handleConfirm} className="btn btn-block rounded-0 btn-primary" disabled={!this.state.username || !this.state.code} value="Confirm">Confirm</button>
              </div>
              <div className="py-1">
                <button onClick={this.handleResend} className="btn btn-block rounded-0 btn-primary" disabled={!this.state.username} value="Resend">Resend Code</button>
              </div>
            </form>
            <div className="py-1">
              <button type="button" className="btn btn-link" onClick={() => this.changeState('signIn')} >Back to Sign In</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}