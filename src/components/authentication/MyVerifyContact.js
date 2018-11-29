import React from 'react';
import { VerifyContact } from 'aws-amplify-react';
import { I18n} from 'aws-amplify';

export class MyVerifyContact extends VerifyContact {
  verifyView() {
    let user = this.props.authData;
    if (!user) {
      console.log('no user for verify');
      return null;
    }
    let unverified = user.unverified;

    if (!unverified) {
      console.log('no unverified on user');
      return null;
    }
    let email = unverified.email,
        phone_number = unverified.phone_number;

    let emailInput;
    if (email) {
      emailInput = <div className="custom-control custom-radio custom-control-inline">
        <input type="radio" onChange={this.handleInputChange} id="email" key="email" name="contact" value="email"className="custom-control-input"/>
        <label className="custom-control-label" htmlFor="email">{I18n.get('Email')}</label>
      </div>
    }

    let phoneNumberInput;
    if (phone_number) {
      phoneNumberInput = <div className="custom-control custom-radio custom-control-inline">
        <input type="radio" className="custom-control-input" onChange={this.handleInputChange} id="phone_number" key="phone_number" name="contact" value="phone_number"/>
        <label className="custom-control-label" htmlFor="phone_number">{I18n.get('Phone Number')}</label>
      </div>
    }

    return (
      <div>
        <div className="mb-3">
          {emailInput}
          {phoneNumberInput}
        </div>
        <div className="py-1">
          <button type="button" onClick={this.verify} className="btn btn-block rounded-0 btn-primary">{I18n.get('Verify')}</button>
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
        <div className="py-1">
          <button type="button" onClick={this.submit} className="btn btn-block rounded-0 btn-primary">{I18n.get('Submit')}</button>
        </div>
      </div>
    );
  }

  showComponent() {
    let _props = this.props,
      hide = _props.hide;

    if (hide && hide.includes(VerifyContact)) {
      return null;
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 text-center my-3">
            <h1>{I18n.get('Verify Contact')}</h1>
            <p>{I18n.get('Account recovery requires verified contact information')}</p>
            <form>
              <div className="form-group">
                {this.state.verifyAttr ? this.submitView() : this.verifyView()}
              </div>
            </form>
            <div className="py-1">
              <button type="button" className="btn btn-link" onClick={() => this.changeState('signedIn')} >Skip verification</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}