var React = require('react');
import Comment from './comment';
import CommentForm from './comment_form';

var Comments = React.createClass({

	render: function() {
		var comments = this.props.comments.map( c => <Comment key={c.id} comment={c} />);
		return (
			<section>
				<h3>Responses</h3>
				<ul>
					{comments}
				</ul>
				<CommentForm article_id={this.props.article_id} />
			</section>
		);
	}

});

module.exports = Comments;