React = require('react')
ApiUtil = require '../util/api_util'
LoginForm = React.createClass
	contextTypes:
		router: React.PropTypes.object.isRequired

	getInitialState: ->
		email: ""
		password: ""

	handleSubmit: (e) ->
		e.preventDefault()
		router = @context.router
		loginCallback = -> router.push '/'

		ApiUtil.logInUser @state, loginCallback

	updateEmail: (e) ->
		@setState email:e.currentTarget.value
	updatePassword: (e) ->
		@setState password:e.currentTarget.value
	
	render: ->
		<div>
			<h1>Please Login</h1>
			<form onSubmit={@handleSubmit}>
			<input type="text" onChange={@updateEmail} value={@state.email}/>
			<input type="password" onChange={@updatePassword} value={@state.password}/>
			<button>Submit</button>
			</form>
		</div>

module.exports = LoginForm