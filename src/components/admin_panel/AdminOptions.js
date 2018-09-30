import React from 'react';
import { Auth, I18n } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';


export class AdminOptions extends React.Component {
  signOut() {
    Auth.signOut()
      .then(() => window.location.reload())
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Header title="Admin Options" />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              {/* <Button title="Manage Volunteers" color="btn-danger rounded-0 btn-block" onClick={() => this.props.history.push('/manageVolunteers')} /> */}
              <Button title="View Logs" color="btn-danger rounded-0 btn-block" onClick={() => this.props.history.push('/viewLogs')} />
              <Button title={I18n.get('Sign Out')} color="btn-primary rounded-0 btn-block" onClick={this.signOut} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
