var React = require('react');
var ApiUtil = require('../util/api_util');

import TextField from 'material-ui/lib/text-field'
import Checkbox from 'material-ui/lib/checkbox'
import RaisedButton from 'material-ui/lib/raised-button'


var LoginForm = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return { 
			email: "", 
			password: "", 
			remember_me:false,
			emailError:"",
			passwordError:""
		};
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;
		ApiUtil.logInUser(this.state, function () {router.push('/');})

	},

	updateEmail: function (e) {
		this.setState({email:e.currentTarget.value});
	},
	updateRememberStatus: function (e) {
		this.setState({remember_me: (!this.state.remember_me)});
	},
	updatePassword: function (e) {
		this.setState({password:e.currentTarget.value});
	},



	passwordNoErrors: function () {
		if (this.state.password.length == 0) return true;
		if (this.state.password.length > 6) {
			return true;
		} else {
			return false;
		}
	},

	emailNoErrors: function () {
		if (this.state.email.length == 0) return true;
		if (this.state.email.includes("@")) {
			return true;
		} else {
			return false;
		}
	},

	jsLink: function (target) {
		window.location = target
	},

	formReady: function () {
		if (this.state.password.length < 4 || this.state.email.length < 4) return false;
		if (this.passwordNoErrors() && this.emailNoErrors()) {
			return true
		} 
		return false;
	},

	demoStart: function (e) {
		e.preventDefault()
		var router = this.context.router
		ApiUtil.logInUser({email:"jackmac79@gmail.com", password:"password"}, () => router.push('/'))
	},
	
	render: function () {
		var buttonStyle = {
			width:'100%',
			margin:'5px',
		}
		var fbStyle = {
			width:'100%',
			margin:'5px',
		}
		var googStyle = {
			width:'100%',
			margin:'5px',
		}

		return (
			<div className="auth-form-container">
				<form className="auth-form" >
					<TextField type="email" onChange={this.updateEmail} floatingLabelText="Email" value={this.state.email}/>
					<TextField floatingLabelText="Password" type="password" onChange={this.updatePassword} value={this.state.password}/> 
					<Checkbox label="Remember Me" onCheck={this.updateRememberStatus} checked={this.state.remember_me} />
					<RaisedButton style={buttonStyle} className="auth-form-button" disabled={!this.formReady()} onClick={this.handleSubmit}  label="Submit"/>
				</form>
				<RaisedButton style={buttonStyle} className="auth-form-button" label="Don't have an account? Create a new one!" onClick={this.props.toggleAuth} />
				<RaisedButton style={fbStyle} className="auth-form-button facebook" label="Sign in with Facebook" onClick={() => this.jsLink("/users/auth/facebook")} />
				<RaisedButton style={googStyle} className="auth-form-button google" label="Sign in with Google" onClick={() => this.jsLink("/users/auth/google_oauth2")} />
				<RaisedButton style={buttonStyle} className="auth-form-button" label="Try With Demo Account" onClick={this.demoStart}/>
			</div>
		)	
	}
});

module.exports = LoginForm;