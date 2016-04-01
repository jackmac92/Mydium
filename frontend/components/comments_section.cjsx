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
			<CommentForm article_id={@props.article_id}/>
		</section>

module.exports = Comments