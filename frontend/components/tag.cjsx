React = require('react')

Tag = React.createClass

	render: ->
		<li>
			{@props.tag.name}
		</li>

module.exports = Tag