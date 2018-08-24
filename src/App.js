import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {withAuthenticator} from 'aws-amplify-react';
import {Auth} from 'aws-amplify';


class App extends Component {
  render() {
       return(
          
            <button onClick={this.props.OAuthSignIn}>
                Sign in with AWS
            </button>
    );
  }
}


export default withAuthenticator(App);
