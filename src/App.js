import React, { Component } from 'react';
import './App.css';
import {withAuthenticator} from 'aws-amplify-react';
import {
    I18n,
    Logger} from 'aws-amplify';
import {CustomSignIn} from './CustomSignIn';
import { CustomSignUp } from './CustomSignUp';
export const inputStyle = {
    fontsize: "2em"
}
export const formStyle = {
    color: "lightblue", 
    backgroundColor: "black", 
    textAlign: "center", 
    height: "100vh", 
    paddingTop: "100px"
}

export const sectionFooter = {
    color: "white",
    padding: '10px 15px',
    borderTop: '1px solid #ddd',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px'
}

export const logger = new Logger('SignUp');

const Footer = (props) => {
    const { onStateChange } = props;
    return (
        <div style={{sectionFooter}}>
            <a onPress={() => onStateChange('confirmSignUp')}>
                {I18n.get('Confirm a Code')}Confirm a Code
            </a>
            <a onPress={() => onStateChange('signIn')}>
                {I18n.get('Sign In')}Sign In
            </a>
        </div>    
        )
}

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
   <CustomSignIn/>,
   <CustomSignUp/>
]);
