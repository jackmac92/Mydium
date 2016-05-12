import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

var Tag = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},
	render: function() {
		var tagStyle = {
			margin:"4px 7px",
		}
		return (
			<RaisedButton 
				labelStyle={{textTransform:"none"}} 
				style={tagStyle} 
				onClick={() => this.context.router.push("/tags/"+this.props.tag.name)} 
				className="tag" 
				label={this.props.tag.name} />
		);
	}

});

module.exports = Tag