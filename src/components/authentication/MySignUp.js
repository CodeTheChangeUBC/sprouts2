import React from 'react';
import { SignUp } from 'aws-amplify-react';
import { Auth, I18n } from 'aws-amplify';

export class MySignUp extends SignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signUp'];
    this.state = {
      name: "",
      username: "",
      password: "",
      email: ""
    };
    
    this.signUp = this.signUp.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }
  
  signUp() {
    const { name, username, password, email } = this.state;
    Auth.signUp({
      username,
      password,
      attributes: {email, name}
    })
      .then(data => {this.changeState('confirmSignUp', username)})
      .catch(err => alert(err));
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

  showComponent() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center my-3">
            <h1>Create A New Account</h1>
            <form>
              <div className="form-group">
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" id="name" key="name" name="name" placeholder="Name" onChange={ this.handleName } value={ this.state.name }/>
              </div>
              <div className="form-group">
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" id="username" key="username" name="username" placeholder="Username" onChange={ this.handleUsername } value={ this.state.username }/>
              </div>
              <div className="form-group">
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="password" id="password" key="password" name="password" placeholder="Password" onChange={ this.handlePassword } value={ this.state.password }/>
              </div>
              <div className="form-group">
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="email" id="email" key="email" name="email" placeholder="Email" onChange={ this.handleEmail } value={ this.state.email }/>
              </div>
              <div className="py-1">
                <button type="button" className="btn btn-block rounded-0 btn-primary" onClick={ this.signUp } >{ I18n.get('Create Account') }</button>
              </div>
            </form>
            <div className="py-1">
              <button type="button" className="btn btn-block rounded-0 btn-primary" onClick={() => this.changeState('confirmSignUp')} >Confirm a code</button>
            </div>
            <div className="py-1">
              <button type="button" className="btn btn-link" onClick={() => this.changeState('signIn')} >Back to Sign In</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}