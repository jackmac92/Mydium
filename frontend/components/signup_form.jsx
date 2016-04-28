var React = require('react');
var ApiUtil = require('../util/api_util');

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import * as Colors from 'material-ui/styles/colors'


var LoginForm = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return { 
			email: "", 
			password: "",
			password_confirm: "",
			username: ""
			};
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;

		ApiUtil.createNewUser(this.state, function () {router.push('/');})
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
		if (!this.passwordErrors() && this.state.email.length > 0 && this.state.username.length > 0) {
			return true
		} 
		return false;
	},
	
	render: function () {
		var buttonStyle = {
			width:'100%',
			margin:'5px',
		}
		var buttonStyleLabel = {
			textTransform:"none !important"
		}
		return (
			<div className="auth-form-container">
				<form className="auth-form">				
					<TextField 
						error={this.emailErrors()} 
						type="email" onChange={this.updateEmail} 
						floatingLabelText="Email" value={this.state.email}/>
					<TextField 
						type="text" 
						onChange={this.updateUsername} 
						floatingLabelText="Username" 
						value={this.state.username}/>
					<TextField 
						floatingLabelText="Password" 
						type="password" 
						onChange={this.updatePassword} 
						value={this.state.password}/>
					<TextField 
						floatingLabelText="Password" 
						error={this.passwordErrors()} 
						type="password" 
						onChange={this.updatePasswordConfirm} 
						value={this.state.password_confirm}/>
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
					label="Already have an Account?" 
					onClick={this.props.toggleAuth} />
			</div>
		)	
	}
});

module.exports = LoginForm;