var React = require('react');
var ApiUtil = require('../util/api_util');

import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'
import Checkbox from 'react-toolbox/lib/checkbox'

var LoginForm = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return { email: "", password: "", remember_me:false };
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;
		ApiUtil.logInUser(this.state, function () {router.push('/');})

	},

	updateEmail: function (e) {
		this.setState({email:e})
	},
	updateRememberStatus: function (e) {
		this.setState({remember_me: (!this.state.remember_me)})
	},
	updatePassword: function (e) {
		this.setState({password:e})
	},

	passwordErrors: function () {
		if (this.state.password.length > 6) {
			return "";
		} else {
			return "Password err"
		}
	},
	emailErrors: function () {
		if (this.state.email.length > 6) {
			return "";
		} else {
			return "Email err"
		}
	},

	formReady: function () {
		if (this.passwordErrors().length == 0 && this.emailErrors().length == 0) {
			return true
		} 
		return false;
	},
	
	render: function () {
		var button;
		if (this.formReady()) {
			button = <Button raised accent ripple onClick={this.handleSubmit} label="Submit" />
		} else {
			button = <Button disabled onClick={this.handleSubmit} label="Submit" />
		}
		return (		
			<div>				
				<Input error={this.emailErrors()} type="email" onChange={this.updateEmail} label="Email" value={this.state.email}/>
				<Input error={this.passwordErrors()} label="Password" type="password" onChange={this.updatePassword} value={this.state.password}/>
				<Checkbox onChange={this.updateRememberStatus} checked={this.state.remember_me} />
				{button}
			</div>
		)	
	}
});

module.exports = LoginForm;