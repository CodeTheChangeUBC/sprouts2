import React from 'react';
import { ForgotPassword } from 'aws-amplify-react';
import { I18n} from 'aws-amplify';

export class MyForgotPassword extends ForgotPassword {
  sendView() {
    return (
      <div>
        <div className="form-group">
          <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" id="username" key="username" name="username" placeholder="Username" onChange={ this.handleInputChange }/>
        </div>
        <div className="py-1">
          <button type="button" onClick={this.send} className="btn btn-block rounded-0 btn-primary">{I18n.get('Send Code')}</button>
        </div>
      </div>
    );
  }

  submitView() {
    return (
      <div>
        <div className="form-group">
          <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" id="code" key="code" name="code" placeholder="Code" onChange={ this.handleInputChange }/>
        </div>
        <div className="form-group">
          <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="password" id="password" key="password" name="password" placeholder="Password" onChange={ this.handleInputChange }/>
        </div>
        <div className="py-1">
          <button type="button" onClick={this.submit} className="btn btn-block rounded-0 btn-primary">{I18n.get('Submit')}</button>
        </div>
      </div>
    );
  }

  showComponent() {
    var _props = this.props,
        hide = _props.hide;

    if (hide && hide.includes(ForgotPassword)) {
        return null;
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center my-3">
            <h1>{I18n.get('Forgot Password')}</h1>
            <form>
              <div className="form-group">
                {this.state.delivery ? this.submitView() : this.sendView()}
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