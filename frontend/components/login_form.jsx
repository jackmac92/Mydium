var React = require('react');
var ApiUtil = require('../util/api_util');

import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'

var LoginForm = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return { email: "", password: "" };
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;

		ApiUtil.logInUser(this.state, function () {router.push('/');})
	},

	updateEmail: function (e) {
		this.setState({email:e})
	},

	updatePassword: function (e) {
		this.setState({password:e})
	},
	
	render: function () {
		return (		
			<div>
				<h1>YOYOYO you gotta Login</h1>
				<Input type="email" onChange={this.updateEmail} label="Email" value={this.state.email}/>
				<Input type="password" onChange={this.updatePassword} value={this.state.password}/>
				<Button onClick={this.handleSubmit} label="Submit" />
			</div>
		)	
	}
});

module.exports = LoginForm;