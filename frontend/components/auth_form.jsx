import React from 'react';
import AuthUtil from '../util/auth'

import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import * as Colors from 'material-ui/styles/colors'


var AuthForm = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return { 
			email: "", 
			password: "",
			password_confirm: "",
			username: "",
			remember_me: true,
			type: "login"
			};
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;
		if (this.state.type == "login") {
			AuthUtil.logInUser(this.state, () => router.push('/'))
		} else {
			AuthUtil.createNewUser(this.state, function () {router.push('/');})
		}
	},

	updateEmail: function (e) {
		this.setState({email:e.currentTarget.value})
	},
	updateUsername: function (e) {
		this.setState({username:e.currentTarget.value})
	},

	updatePassword: function (e) {
		this.setState({password:e.currentTarget.value})
	},
	updatePasswordConfirm: function (e) {
		this.setState({password_confirm:e.currentTarget.value})
	},

	updateRememberStatus: function (e) {
		this.setState({remember_me: (!this.state.remember_me)});
	},


	toggleAuth: function () {
		var newState = (this.state.type == "login") ? "signup" : "login";
		this.setState({type:newState})
	},
	
	passwordErrors: function () {
		if (this.state.password.length == 0 || this.state.password_confirm.length == 0 ) return "";
		if (this.state.password.length > 6 && this.state.password === this.state.password_confirm) {
			return "";
		} else {
			return "Invalid Password"
		}
	},
	emailErrors: function () {
		if (this.state.email.length > 6 || this.state.email.length == 0) {
			return "";
		} else {
			return "Invalid Email"
		}
	},

	formReady: function () {
		if (this.state.type == "login") {
			if (!this.passwordErrors() && this.state.email.length > 0) {
				return true
			}
		} else {
			if (!this.passwordErrors() && this.state.email.length > 0 && this.state.username.length > 0) {
				return true
			}			
		}
		return false;
	},
	
	render: function () {
		var rememberStatus, buttonStyle, buttonStyleLabel, userNameField, emailField, passwordField, passwordConfirmField;
		buttonStyle = {
			width:'100%',
			margin:'5px',
		}

		buttonStyleLabel = {
			textTransform:"none !important"
		}
		
		emailField = (
			<TextField 
				error={this.emailErrors()} 
				type="email" onChange={this.updateEmail} 
				floatingLabelText="Email"
				value={this.state.email} />
		)
		passwordField = (
			<TextField 
				floatingLabelText="Password" 
				type="password" 
				onChange={this.updatePassword} 
				value={this.state.password}/>
		)
		if (this.state.type == "signup") {
			userNameField = (
				<TextField 
					type="text" 
					onChange={this.updateUsername} 
					floatingLabelText="Username" 
					value={this.state.username}/>
			)
			passwordConfirmField = (
				<TextField 
					floatingLabelText="Confirm Password" 
					error={this.passwordErrors()}
					type="password" 
					onChange={this.updatePasswordConfirm} 
					value={this.state.password_confirm}/>
			)			
		} else {
			rememberStatus = (
				<Checkbox 
					label="Remember Me" 
					onCheck={this.updateRememberStatus} 
					checked={this.state.remember_me} />
			)
		}
		
		


		return (
			<div className="auth-form-container">
				<form className="auth-form">
					{emailField}
					{userNameField}
					{passwordField}
					{passwordConfirmField}
					<RaisedButton 
						style={buttonStyle} 
						labelStyle={buttonStyleLabel}
						className="auth-form-button" 
						disabled={!this.formReady()} 
						onClick={this.handleSubmit}  
						label="Submit"/>
				</form>

				<RaisedButton 
					backgroundColor={Colors.blue600} 
					icon={<FontIcon className="fa fa-facebook-official"/>} 
					style={buttonStyle} 
					labelStyle={buttonStyleLabel}
					className="auth-form-button" 
					label="Sign in with Facebook" 
					href="/users/auth/facebook" 
					linkButton={true} />
				<RaisedButton 
					backgroundColor={Colors.red600} 
					icon={<FontIcon className="fa fa-google"/>} 
					style={buttonStyle} 
					labelStyle={buttonStyleLabel}
					className="auth-form-button" 
					label="Sign in with Google" 
					href="/users/auth/google_oauth2" 
					linkButton={true} />
				<RaisedButton 
					style={buttonStyle} 
					labelStyle={buttonStyleLabel}
					className="auth-form-button" 
					label={(this.state.type == "login") ? "Create a new account" : "Already have an Account?"} 
					onClick={this.toggleAuth} />
			</div>
		)	
	}
});

module.exports = AuthForm;