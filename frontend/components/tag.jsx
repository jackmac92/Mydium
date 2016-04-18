var React = require('react');
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';

var Tag = React.createClass({

	render: function() {
		return (
			<a href={"#/tags/"+this.props.tag.name} >
				<Paper className="tag">
					{this.props.tag.name}
				</Paper>
			</a>
		);
	}

});

module.exports = Tag