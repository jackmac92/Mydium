var React = require('react');
import Link from 'react-toolbox/lib/link'

var Tag = React.createClass({

	render: function() {
		return (
			<Link className="tag" label={this.props.tag.name} href={"#/tags/"+this.props.tag.name} />
		);
	}

});

module.exports = Tag