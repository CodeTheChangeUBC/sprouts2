import React, { Component } from 'react';
import './App.css';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import { MySignIn } from './components/authentication/MySignIn';

class App extends Component {
  render() {
    return(
      <div>
        <h1>Sprouts Application</h1>
      </div>
    );
  }
}



export default withAuthenticator(App, {includeGreetings:true}, [
  <MySignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <SignUp/>,
  <ConfirmSignUp/>,
  <ForgotPassword/>
]);
