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

var _AuthPiece2 = require('./AuthPiece');

var _AuthPiece3 = _interopRequireDefault(_AuthPiece2);

var _FederatedSignIn = require('./FederatedSignIn');

var _AmplifyTheme = require('../AmplifyTheme');

var _AmplifyTheme2 = _interopRequireDefault(_AmplifyTheme);

var _AmplifyUI = require('../AmplifyUI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _core.ConsoleLogger('SignIn'); 












var SignIn = function (_AuthPiece) {
    (0, _inherits3.default)(SignIn, _AuthPiece);

    function SignIn(props) {
        (0, _classCallCheck3.default)(this, SignIn);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

        _this.checkContact = _this.checkContact.bind(_this);
        _this.signIn = _this.signIn.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);

        _this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(SignIn, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('keydown', this.onKeyDown);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('keydown', this.onKeyDown);
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(e) {
            if (this.props.authState === 'signIn' && !this.props.hide) {
                if (e.keyCode === 13) {
                    // when press enter
                    this.signIn();
                }
            }
        }
    }, {
        key: 'checkContact',
        value: function checkContact(user) {
            var _this2 = this;

            if (!_auth2.default || typeof _auth2.default.verifiedContact !== 'function') {
                throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
            }
            _auth2.default.verifiedContact(user).then(function (data) {
                if (!_core.JS.isEmpty(data.verified)) {
                    _this2.changeState('signedIn', user);
                } else {
                    user = Object.assign(user, data);
                    _this2.changeState('verifyContact', user);
                }
            });
        }
    }, {
        key: 'signIn',
        value: function signIn() {
            var _this3 = this;

            var _inputs = this.inputs,
                username = _inputs.username,
                password = _inputs.password;

            if (!_auth2.default || typeof _auth2.default.signIn !== 'function') {
                throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported');
            }
            _auth2.default.signIn(username, password).then(function (user) {
                logger.debug(user);
                if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
                    logger.debug('confirm user with ' + user.challengeName);
                    _this3.changeState('confirmSignIn', user);
                } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    logger.debug('require new password', user.challengeParam);
                    _this3.changeState('requireNewPassword', user);
                } else if (user.challengeName === 'MFA_SETUP') {
                    logger.debug('TOTP setup', user.challengeParam);
                    _this3.changeState('TOTPSetup', user);
                } else {
                    _this3.checkContact(user);
                }
            }).catch(function (err) {
                if (err.code === 'UserNotConfirmedException') {
                    logger.debug('the user is not confirmed');
                    _this3.changeState('confirmSignUp');
                } else {
                    _this3.error(err);
                }
            });
        }
    }, {
        key: 'showComponent',
        value: function showComponent(theme) {
            var _this4 = this;

            var _props = this.props,
                authState = _props.authState,
                hide = _props.hide,
                federated = _props.federated,
                onStateChange = _props.onStateChange;

            if (hide && hide.includes(SignIn)) {
                return null;
            }

            return _react2.default.createElement(
                _AmplifyUI.FormSection,
                { theme: theme },
                _react2.default.createElement(
                    _AmplifyUI.SectionHeader,
                    { theme: theme },
                    _core.I18n.get('Sign In Account')
                ),
                _react2.default.createElement(
                    _AmplifyUI.SectionBody,
                    { theme: theme },
                    _react2.default.createElement(_AmplifyUI.InputRow, {
                        autoFocus: true,
                        placeholder: _core.I18n.get('Username'),
                        theme: theme,
                        key: 'username',
                        name: 'username',
                        onChange: this.handleInputChange
                    }),
                    _react2.default.createElement(_AmplifyUI.InputRow, {
                        placeholder: _core.I18n.get('Password'),
                        theme: theme,
                        key: 'password',
                        type: 'password',
                        name: 'password',
                        onChange: this.handleInputChange
                    }),
                    _react2.default.createElement(
                        _AmplifyUI.ButtonRow,
                        { theme: theme, onClick: this.signIn },
                        _core.I18n.get('Sign In')
                    ),
                    _react2.default.createElement(_FederatedSignIn.FederatedButtons, {
                        federated: federated,
                        theme: theme,
                        authState: authState,
                        onStateChange: onStateChange
                    })
                ),
                _react2.default.createElement(
                    _AmplifyUI.SectionFooter,
                    { theme: theme },
                    _react2.default.createElement(
                        'div',
                        { style: theme.col6 },
                        _react2.default.createElement(
                            _AmplifyUI.Link,
                            { theme: theme, onClick: function onClick() {
                                    return _this4.changeState('forgotPassword');
                                } },
                            _core.I18n.get('Forgot Password')
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: Object.assign({ textAlign: 'right' }, theme.col6) },
                        _react2.default.createElement(
                            _AmplifyUI.Link,
                            { theme: theme, onClick: function onClick() {
                                    return _this4.changeState('signUp');
                                } },
                            _core.I18n.get('Sign Up')
                        )
                    )
                )
            );
        }
    }]);
    return SignIn;
}(_AuthPiece3.default);

exports.default = SignIn;