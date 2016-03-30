React = require('react')

Sidebar = React.createClass

	render: ->
		<section className="content-sidebar">
			<ul>
				<li>Featured Tags</li>
				<li>Your Tags</li>
				<li>Top Stories</li>
			</ul>
		</section>

module.exports = Sidebar

