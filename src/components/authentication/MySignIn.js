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
      <div>
        <input type="text" id="username" key="username" name="username" placeholder="Username" onChange={this.handleInputChange}/>
        <input type="password" id="password" key="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
        <button onClick={ this.signIn } value="Sing In" >{I18n.get('Sign In')}</button>
        <div>
          { !hideForgotPassword && 
            <a onClick={() => this.changeState('forgotPassword')}>
              {I18n.get('Forgot Password')}
            </a> }
        </div>
        <div>
          { !hideSignUp && 
            <a onClick={() => this.changeState('signUp')}>
              {I18n.get('Sign Up')}
            </a> }
        </div>
      </div>
    )
  }
}