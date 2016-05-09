var React = require('react');
import CommentUtil from '../util/comment'
import FlatButton from 'material-ui/FlatButton'
var Comment = React.createClass({

	handleDelete: function (id) {
		CommentUtil.destroyArticleComment(id)
	},

	render: function() {
		var deleteButton;
		if (this.props.comment.userMadeComment) {
			deleteButton = <FlatButton label="Delete" onClick={this.handleDelete.bind(this, this.props.comment.id)} />
		}
		return (
			<li className="article-comment">
				<img className="author-thumb" src={this.props.comment.user.avatar} />
				<p className="author-email">{this.props.comment.user.email}</p>
				{this.props.comment.body}
				{deleteButton}
			</li>
		);
	}

});

module.exports = Comment;