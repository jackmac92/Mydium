React = require('react')
Comment = require './comment'
CommentForm = require './comment_form'

Comments = React.createClass

	render: ->
		comments = @props.comments.map (c) ->
			<Comment key={c.id} comment={c}/>

		<section>
			<h3>Responses</h3>
			<ul>
				{comments}
			</ul>
			<CommentForm />
		</section>

module.exports = Comments