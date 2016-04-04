var React = require('react');

var Comment = React.createClass({

	render: function() {
		return (
			<li>
				<img className="author-thumb" src={this.props.comment.user.avatar} />
				<p className="author-email">{this.props.comment.user.email}</p>
				{this.props.comment.body}
			</li>
		);
	}

});

module.exports = Comment;