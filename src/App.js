import React, { Component } from 'react';
import './App.css';
import { Auth } from 'aws-amplify';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import { MySignIn } from './components/authentication/MySignIn';
import { RoutingTable } from './components/RoutingTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userGroup: "volunteer" 
    };
  }

  componentDidMount() {
    Auth.currentSession()
      .then((session) => {
        if (session.accessToken.payload['cognito:groups']) {
          this.setState({userGroup: session.accessToken.payload['cognito:groups'][0]});
        }
      })
      .catch(err => console.log(err));
  }

  render() {  
    return(
      <div>
        <RoutingTable userGroup={ this.state.userGroup } />
      </div>
    );
  }
}

export default withAuthenticator(App, false, [
  <MySignIn/>,
  <ConfirmSignIn/>,
  <VerifyContact/>,
  <SignUp/>,
  <ConfirmSignUp/>,
  <ForgotPassword/>
]);
