import Amplify from "aws-amplify";
import aws_exports from './aws-exports';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
