// import React, { Component } from 'react';
// import { Auth } from 'aws-amplify';
// import Greetings from 'aws-amplify-react/dist/Auth/Greetings';

// export class CustomGreetings extends Greetings {
//     constructor(props) {
//         super(props);
//         this.signOut = this.signOut.bind(this);
//     }
//     signOut() {
//         Auth.signOut()
//             .then(() => this.changeState("signedOut"))
//             .catch(err => this.error(err));
//     }
//     signedInMessage(username) { return "Dashboard for " + username; }
//     signedOutMessage() { return "Please Sign In / Sign Up"; }
//     userGreetings() {
//         const user = this.props.authData || this.props.user;
//         const message = this.props.signedInMessage || this.signedInMessage;
//         const greeting = (typeof message === "function") ?
//             message(user.username) : message;
//         return (<div>
//             <h2>Greetings</h2>
//             <button title="Sign Out" onPress={this.signOut} />
//         </div>);
//     }
//     noUserGreetings() {
//         const message = this.props.signedOutMessage || this.signedOutMessage;
//         const greeting = (typeof message === "function") ? message() : message;
//         return (<div>
//             <h2>No Greetings</h2>
//         </div>);
//     }
//     render() {
//         const { authState } = this.props;
//         const signedIn = (authState === "signedIn");
//         return (<div>
//             {signedIn ? this.userGreetings() : this.noUserGreetings()}
//         </div>);
//     }
// }




'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@aws-amplify/core');

var _auth = require('@aws-amplify/auth');

var _auth2 = _interopRequireDefault(_auth);


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

var logger = new _core.ConsoleLogger('Greetings');

var Greetings = function (_AuthPiece) {
    (0, _inherits3.default)(Greetings, _AuthPiece);

    function Greetings(props) {
        (0, _classCallCheck3.default)(this, Greetings);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Greetings.__proto__ || Object.getPrototypeOf(Greetings)).call(this, props));

        _this.signOut = _this.signOut.bind(_this);
        _this.checkUser = _this.checkUser.bind(_this);
        _this.onHubCapsule = _this.onHubCapsule.bind(_this);

        _this.state = {
            authState: props.authState,
            authData: props.authData
        };

        _core.Hub.listen('auth', _this);
        return _this;
    }

    (0, _createClass3.default)(Greetings, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._isMounted = true;
            this.checkUser();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
        }
    }, {
        key: 'signOut',
        value: function signOut() {
            var _this2 = this;
            if (!_auth2.default || typeof _auth2.default.signOut !== 'function') {
                throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
            }
            _auth2.default.signOut().then(function () {
                return _this2.changeState('signedOut');
            }).catch(function (err) {
                logger.error(err);_this2.error(err);
            });
        }
    },  {
        key: 'checkUser',
        value: function checkUser() {
            var _this3 = this;

            var that = this;
            var authState = this.state.authState;

            if (!_auth2.default || typeof _auth2.default.currentAuthenticatedUser !== 'function') {
                throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
            }
            return _auth2.default.currentAuthenticatedUser().then(function (user) {
                if (!that._isMounted) {
                    return;
                }
                if (authState !== 'signedIn') {
                    _this3.setState({
                        authState: 'signedIn',
                        authData: user
                    });
                    _this3.changeState('signedIn', user);
                }
            }).catch(function (err) {
                if (!that._isMounted) {
                    return;
                }
                _this3.signOut();
            });
        }
    }, {
        key: 'onHubCapsule',
        value: function onHubCapsule(capsule) {
            var channel = capsule.channel,
                payload = capsule.payload,
                source = capsule.source;

            if (channel === 'auth' && (payload.event === 'configured' || payload.event === 'cognitoHostedUI')) {
                this.checkUser();
            }
        }
    }, {
        key: 'inGreeting',
        value: function inGreeting(name) {
            return 'Dashboard ' + name;
        }
    }, {
        key: 'outGreeting',
        value: function outGreeting() {
            return 'Please Sign In';
        }
    }, {
        key: 'userGreetings',
        value: function userGreetings(theme) {
            var user = this.state.authData;
            var greeting = this.props.inGreeting || this.inGreeting;
            // get name from attributes first
            var nameFromAttr = user.attributes ? user.attributes.name || (user.attributes.given_name ? user.attributes.given_name + ' ' + user.attributes.family_name : undefined) : undefined;

            var name = nameFromAttr || user.name || user.username;
            var message = typeof greeting === 'function' ? greeting(name) : greeting;
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    message
                ),
                _react2.default.createElement(
                    { onClick: this.signOut
                    })
            );
        }
    }, {
        key: 'noUserGreetings',
        value: function noUserGreetings(theme) {
            var greeting = this.props.outGreeting || this.outGreeting;
            var message = typeof greeting === 'function' ? greeting() : greeting;
            return message ? _react2.default.createElement(
                message
            ) : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var hide = this.props.hide;

            if (hide && hide.includes(Greetings)) {
                return null;
            }

            var authState = this.state.authState;

            var signedIn = authState === 'signedIn';

            var theme = this.props.theme;
            var greeting = signedIn ? this.userGreetings(theme) : this.noUserGreetings(theme);
            if (!greeting) {
                return null;
            }

            return _react2.default.createElement(
                        greeting
            );
        }
    }]);
    return Greetings;
}

exports.default = Greetings;