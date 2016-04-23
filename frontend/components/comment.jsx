var React = require('react');
import ApiUtil from '../util/api_util'
import FlatButton from 'material-ui/FlatButton'
var Comment = React.createClass({

	handleDelete: function (id) {
		ApiUtil.destroyArticleComment(id)
	},

	render: function() {
		var deleteButton;
		if (this.props.comment.userMadeComment) {
			deleteButton = <FlatButton label="Delete" onClick={this.handleDelete.bind(this, this.props.comment.id)} />
		}
		return (
			<li>
				<img className="author-thumb" src={this.props.comment.user.avatar} />
				<p className="author-email">{this.props.comment.user.email}</p>
				{this.props.comment.body}
				{deleteButton}
			</li>
		);
	}

});

module.exports = Comment;