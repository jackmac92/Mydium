import React from 'react';
import CommentUtil from '../util/comment'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';




var Comment = React.createClass({

	handleDelete: function (id) {
		CommentUtil.destroyArticleComment(id)
	},



	render: function() {
		var deleteButton;
		if (this.props.comment.userMadeComment) {
			deleteButton = <IconButton onClick={this.handleDelete.bind(this, this.props.comment.id)} tooltip="delete" iconClassName="fa fa-trash-o" />
		}
					 

		return (
			<ListItem
				disabled={true}
				leftAvatar={ <Avatar src={this.props.comment.user.avatar} />}
				primaryText={this.props.comment.body}
				secondaryText={this.props.comment.user.username}
				rightIconButton={deleteButton}
			/>
		);
	}

});

module.exports = Comment;