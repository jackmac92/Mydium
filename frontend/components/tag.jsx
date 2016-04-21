var React = require('react');
import RaisedButton from 'material-ui/lib/raised-button';

var Tag = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},
	render: function() {
		return (
			<RaisedButton labelStyle={{textTransform:"none"}} style={{margin:"4px 7px"}} onClick={() => this.context.router.push("#/tags/"+this.props.tag.name)} className="tag" label={this.props.tag.name} />
		);
	}

});

module.exports = Tag