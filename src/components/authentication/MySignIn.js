import React from 'react';
import { SignIn } from 'aws-amplify-react';
import { I18n} from 'aws-amplify';

export class MySignIn extends SignIn {
  showComponent() {
    const { authState, hide = [], federated, onStateChange } = this.props;
    if (hide && hide.includes(SignIn)) { return null; }
    const hideSignUp = hide.some(component => component.name === 'SignUp')
    const hideForgotPassword = hide.some(component => component.name === 'ForgotPassword')

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center my-3">
            <h1>Sign In</h1>
            <div className="form-group">
              <input className="form-control" type="text" id="username" key="username" name="username" placeholder="Username" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" type="password" id="password" key="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
            </div>
            <div className="row justify-content-center py-1">
              <div className="col-12 col-md-">
                <button className="btn btn-block rounded-0 btn-primary" onClick={ this.signIn } value="Sign In" >{I18n.get('Sign In')}</button>
              </div>
            </div>
            <div className="py-1">
              { !hideSignUp && 
                <a className="btn btn-block rounded-0 btn-primary text-white" onClick={() => this.changeState('signUp')}>
                  {I18n.get('Sign Up')}
                </a> }
            </div>
            <div className="py-1">
              { !hideForgotPassword && 
                <a href="#" onClick={() => this.changeState('forgotPassword')}>
                  {I18n.get('Forgot Password')}
                </a> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}