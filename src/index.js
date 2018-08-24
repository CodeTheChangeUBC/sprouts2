import Amplify, { Auth } from 'aws-amplify-react';
import aws_exports from './aws-exports';


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
