var React = require('react');
import Link from 'react-toolbox/lib/link'
import Paper from 'material-ui/lib/paper';

var Tag = React.createClass({

	render: function() {
		return (
			<Paper className="tag">
				<Link label={this.props.tag.name} href={"#/tags/"+this.props.tag.name} />
			</Paper>
		);
	}

});

module.exports = Tag