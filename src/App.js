import React, { Component } from 'react';
import './App.css';
import { ConfirmSignIn, withAuthenticator } from 'aws-amplify-react';
import {
    Auth,
    I18n,
    Logger} from 'aws-amplify';
import { CustomSignIn } from './CustomSignIn';
import { CustomSignUp } from './CustomSignUp';
import { CustomConfirmSignUp } from './CustomConfirmSignUp';

export const formStyle = {
    color: "teal", 
    backgroundColor: "orange", 
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

class CustomConfirmSignIn extends ConfirmSignIn {
    constructor(props) {
        super(props);

        this._validAuthStates = ['confirmSignIn'];
        this.state = {
            code: null,
            error: null
        }

        this.confirm = this.confirm.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCode = this.handleCode.bind(this);
    }
    handleCode(event) {
        this.setState({ code: event.target.value });
    }

    handleConfirm(event) {
        this.confirm();
    }
    confirm() {
        const user = this.props.authData;
        const { code } = this.state;
        alert('Confirm Sign In for ' + user.username);
        Auth.confirmSignIn(user, code)
            .then(data => this.changeState('signedIn'))
            .catch(err => this.error(err));
    }

    showComponent(theme) {
        return (
                <div style={formStyle}>
                    <h2>Confirm Sign In</h2>
                    <form>
                        <label> 
                            Confirmation Code: 
                            <textarea title="Code" onChangeText={this.handleCode}></textarea>
                        </label>
                        <button
                            title="confirm"
                            onClick={this.handleConfirm}
                            disabled={!this.state.code}
                        />
                    </form>
                </div>
            
        );
    }
}


class App extends Component {
  render() {
       return(
           <div>
            <h1 style={{textAlign: "center"}}>Sprouts Application</h1>
            </div>
    );
  }
}

export default withAuthenticator(App, {includeGreetings:true}, [
   <CustomSignIn/>,
   <CustomSignUp/>,
   <CustomConfirmSignUp/>,
   <CustomConfirmSignIn/>,
]);
