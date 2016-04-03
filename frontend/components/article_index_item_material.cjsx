React = require('react')
Card = require('react-toolbox/lib/card').Card
CardMedia = require('react-toolbox/lib/card').CardMedia
CardTitle = require('react-toolbox/lib/card').CardTitle
CardText = require('react-toolbox/lib/card').CardText
CardActions = require('react-toolbox/lib/card').CardActions

TestCard = ->
	<Card style={width: '350px'}>
		<CardTitle 
			title={@props.title}
			subtitle={@props.subtitle}
		/>
	</Card>

module.exports = TestCard