var React = require('react');
var ApiUtil = require('../util/api_util');

import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'
import Link from 'react-toolbox/lib/link'
import Checkbox from 'react-toolbox/lib/checkbox'

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
	
	render: function () {
		var button;
		if (this.formReady()) {
			button = <Button raised accent ripple onClick={this.handleSubmit} label="Submit" />
		} else {
			button = <Button raised disabled onClick={this.handleSubmit} label="Submit" />
		}
		return (
			<div>
				<form className="auth-form" >
					<Input type="email" onChange={this.updateEmail} label="Email" value={this.state.email}/>
					<Input label="Password" type="password" onChange={this.updatePassword} value={this.state.password}/>
					<Checkbox label="Remember Me" onChange={this.updateRememberStatus} checked={this.state.remember_me} />
					{button}
				</form>
				<Link label="Don't have an account? Create a new one!" href="#/signup" />
			</div>
		)	
	}
});

module.exports = LoginForm;