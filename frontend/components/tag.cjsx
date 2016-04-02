React = require('react')

Tag = React.createClass

	render: ->
		<li className="tag">
			{@props.tag.name}
		</li>

module.exports = Tag