import React from 'react';
import { SignUp } from 'aws-amplify-react';
import { Auth, I18n } from 'aws-amplify';

export class MySignUp extends SignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signUp'];
    this.state = {
      username: "",
      password: "",
      checkPassword: "",
      email: ""
    };
    this.signUp = this.signUp.bind(this);
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }
  
  signUp() {
    const { username, password, email } = this.state;
    if (this.state.email === "") {
      alert("Please enter a valid email address.") 
    } else if (this.state.username === "") {
      alert("Please enter a valid UserName.") 
    } else if (this.state.password !== this.state.checkPassword) {
      alert("Passwords do not match.") 
    } else if (this.state.password.length < 8)  {
      alert("Password must contain at least one uppercase letter, lowercase letter, number and must be at least 8 characters long")
    } else if (this.state.password === this.state.password.toLowerCase() ||
              this.state.password === this.state.password.toUpperCase())  {
      alert("Password must contain at least one uppercase letter, lowercase letter, and number.")
    } else if (!/\d/.test(this.state.password))  {
      alert("Password must contain at least one number.")
    } else  {
      Auth.signUp({
      username,
      password,
      attributes: {email}
    })
      .then(data => {
        alert("Please check your email for your account verification link.")
        this.changeState('signIn');
      })
      .catch(err => { 
        if (err["message"]) {
          alert(err["message"]);
        } else {
          alert(err);
        }
      });
    }
  }
  
  handleEmail(event) {
    this.setState({ email: event.target.value});
  }
  
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleCheckPassword(event) {
    this.setState({ checkPassword: event.target.value});
  }
  showComponent() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center my-3">
            <h1 className="pb-2">Create A New Account</h1>
            <form>
              <div className="form-group">
                <h6 className="text-left mb-0">Username</h6>
                <p className="text-left text-muted small mb-0">Please use your name without spaces.</p>
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" id="username" key="username" name="username" placeholder="Ex. JohnDoe" onChange={ this.handleUsername } value={ this.state.username }/>
              </div>
              <div className="form-group">
                <h6 className="text-left mb-0">Email</h6>
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="email" id="email" key="email" name="email" placeholder="Ex. John@example.com" onChange={ this.handleEmail } value={ this.state.email }/>
              </div>
              <div className="form-group">
                <h6 className="text-left mb-0">Password</h6>
                <p className="text-left text-muted small mb-0">Use 8 or more characters with a mix of lowercase and uppercase letters and numbers.</p>
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="password" id="password" key="password" name="password" placeholder="" onChange={ this.handlePassword } value={ this.state.password }/>
              </div>
              <div className="form-group">
                <h6 className="text-left mb-0">Verify Password</h6>
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="password" id="checkPassword" key="checkPassword" name="checkPassword" placeholder="" 
                onChange={ this.handleCheckPassword } value={ this.state.checkPassword }/>
              </div>
              <div className="py-1">
                <button type="button" className="btn btn-block rounded-0 btn-primary" onClick={ this.signUp } >{ I18n.get('Create Account') }</button>
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