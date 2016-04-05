var React = require('react');
var ApiUtil = require('../util/api_util');

import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'

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
		this.setState({email:e})
	},
	updateUsername: function (e) {
		this.setState({username:e})
	},

	updatePassword: function (e) {
		this.setState({password:e})
	},
	updatePasswordConfirm: function (e) {
		this.setState({password_confirm:e})
	},
	
	passwordErrors: function () {
		if (this.state.password.length == 0 || this.state.password_confirm.length == 0 ) return "";
		if (this.state.password.length > 6 && this.state.password === this.state.password_confirm) {
			return "";
		} else {
			return "Passwords Don't Match"
		}
	},
	emailErrors: function () {
		if (this.state.email.length > 6 || this.state.email.length == 0) {
			return "";
		} else {
			return "Email err"
		}
	},

	formReady: function () {
		if (!this.passwordErrors() && this.state.email.length > 0 && this.state.username.length > 0) {
			return true
		} 
		return false;
	},
	
	render: function () {
		var button;
		if (this.formReady()) {
			button = <Button raised accent ripple onClick={this.handleSubmit} label="Submit" />
		} else {
			button = <Button raised disabled onClick={this.handleSubmit} label="Submit" />
		}
		return (		
			<form className="auth-form">				
				<Input error={this.emailErrors()} type="email" onChange={this.updateEmail} label="Email" value={this.state.email}/>
				<Input type="text" onChange={this.updateUsername} label="Username" value={this.state.username}/>
				<Input label="Password" type="password" onChange={this.updatePassword} value={this.state.password}/>
				<Input label="Password" error={this.passwordErrors()} type="password" onChange={this.updatePasswordConfirm} value={this.state.password_confirm}/>
				{button}
			</form>
		)	
	}
});

module.exports = LoginForm;