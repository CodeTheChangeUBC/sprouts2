import React from 'react';
import { SignIn } from 'aws-amplify-react';
import { I18n} from 'aws-amplify';

export class MySignIn extends SignIn {
  showComponent() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center my-3">
            <h1>Sign In</h1>
            <form>
              <div className="form-group">
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" id="username" key="username" name="username" placeholder="Username" onChange={ this.handleInputChange }/>
              </div>
              <div className="form-group">
                <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="password" id="password" key="password" name="password" placeholder="Password" onChange={ this.handleInputChange }/>
              </div>
              <div className="row py-1">
                <div className="col-12">
                  <button type="button" className="btn btn-block rounded-0 btn-primary" onClick={ this.signIn } value="Sign In" >{ I18n.get('Sign In') }</button>
                </div>
              </div>
            </form>
            <div className="py-1">
              <button type="button" className="btn btn-block rounded-0 btn-primary text-white" onClick={ () => this.changeState('signUp') }>
                {I18n.get('Create Account')}
              </button>
            </div>
            <div className="py-1">
              <button type="button" className="btn btn-link" onClick={ () => this.changeState('forgotPassword') }>
                {I18n.get('Forgot password?')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}