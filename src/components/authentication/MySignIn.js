import React from 'react';
import { SignIn } from 'aws-amplify-react';
import { I18n} from 'aws-amplify';

import logo from '../../sprouts_logo.png';

export class MySignIn extends SignIn {
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
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" id="username" key="username" name="username" placeholder="Username" onChange={ this.handleInputChange }/>
              </div>
              <div className="form-group">
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="password" id="password" key="password" name="password" placeholder="Password" onChange={ this.handleInputChange }/>
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
              <p className="text-muted small">&copy; 2018 Sprouts UBC. Developed by <a className="text-muted" href="http://codethechangeubc.org">Code the Change UBC</a>.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}