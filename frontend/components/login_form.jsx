var React = require('react');
var ApiUtil = require('../util/api_util');

import Input from 'react-toolbox/lib/input'
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
		this.setState({email:e});
	},
	updateRememberStatus: function (e) {
		this.setState({remember_me: (!this.state.remember_me)});
	},
	updatePassword: function (e) {
		this.setState({password:e});
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
			textTransform:"none"
		}
		return (
			<div className="auth-form-container">
				<form className="auth-form" >
					<Input type="email" onChange={this.updateEmail} label="Email" value={this.state.email}/>
					<Input label="Password" type="password" onChange={this.updatePassword} value={this.state.password}/> 
					<Checkbox label="Remember Me" onCheck={this.updateRememberStatus} checked={this.state.remember_me} />
				</form>
				<RaisedButton style={buttonStyle} className="auth-form-button" disabled={!this.formReady()} onClick={this.handleSubmit}  label="Submit"/>
				<RaisedButton style={buttonStyle} className="auth-form-button" label="Don't have an account? Create a new one!" onClick={this.props.toggleAuth} />
				<RaisedButton style={buttonStyle} className="auth-form-button" label="Sign in with Facebook" href="/users/auth/facebook" linkButton={true} />
				<RaisedButton style={buttonStyle} className="auth-form-button" label="Sign in with Google" href="/users/auth/google_oauth2" linkButton={true} />
				<RaisedButton style={buttonStyle} className="auth-form-button" label="Try With Demo Account" onClick={this.demoStart}/>
			</div>
		)	
	}
});

module.exports = LoginForm;