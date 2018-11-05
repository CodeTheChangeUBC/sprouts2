import React, { Component } from 'react';
import './App.css';
import { Auth } from 'aws-amplify';
import { ConfirmSignIn, RequireNewPassword, withAuthenticator } from 'aws-amplify-react';
import { MySignIn } from './components/authentication/MySignIn';
import { MySignUp } from './components/authentication/MySignUp';
import { MyForgotPassword } from './components/authentication/MyForgotPassword';
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
  <MySignUp/>,
  <MyForgotPassword/>,
  <RequireNewPassword/>
]);
