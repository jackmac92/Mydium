React = require('react')

Comment = React.createClass

	render: ->
		<li>
			<img className="author-thumb" src={@props.comment.user.avatar} />
			<p className="author-email">{@props.comment.user.email}</p>
			{@props.comment.body}
		</li>

module.exports = Comment