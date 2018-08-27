import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import { MySignIn } from './components/authentication/MySignIn';
import { Auth } from 'aws-amplify';


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = (props) => {
  if(props.userGroup === 'none') {
    return (
      <Router>
        <div>
          <h1>Hello, {props.userGroup}</h1>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div>
          <h1>Hello, {props.userGroup}</h1>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </Router>
    );
  }
  
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userGroup: "none" };
  }

  componentDidMount() {
    Auth.currentSession()
      .then(session => this.setState({userGroup: session.accessToken.payload['cognito:groups'][0]}))
      .catch(err => console.log(err));
  }

  render() {  
    return(
      <div>
        <BasicExample userGroup={ this.state.userGroup } />
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
