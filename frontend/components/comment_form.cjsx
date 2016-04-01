React = require('react')
ApiUtil = require '../util/api_util'


CommentForm = React.createClass
	getInitialState: ->
		body: ""
		article_id:@props.article_id

	handleInput: (e) ->
		@setState body: e.currentTarget.value

	handleSubmit: (e) ->
		e.preventDefault()
		ApiUtil.createArticleComment @state

	render: ->
		<section>
			<input onChange={@handleInput} type="text" />
			<button onClick={@handleSubmit}>Add Response</button>
		</section>

module.exports = CommentForm