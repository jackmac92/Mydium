var React = require('react');
import Comment from './comment';
import CommentForm from './comment_form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

var Comments = React.createClass({

	render: function() {
		var comments = this.props.comments.map( c => <Comment key={c.id} comment={c} />);
		return (
			<section>
				<h3>Responses</h3>
				<CommentForm commentTimer={this.props.commentTimer} disabled={this.props.disabled} className="comment-form" article_id={this.props.article_id} />
				<ul className="comment-list">
          <ReactCSSTransitionGroup
            transitionName="comment"
            transitionEnterTimeout={900}
            transitionLeaveTimeout={900}
          >
						{comments}
					</ReactCSSTransitionGroup>
				</ul>
			</section>
		);
	}

});
				// <div style={{height:"200px"}} />

module.exports = Comments;