import React from 'react';
import CommentUtil from '../util/comment'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SessionStore from '../stores/session'
import LinearProgress from 'material-ui/LinearProgress';
import * as Colors from 'material-ui/styles/colors';


var CommentForm = React.createClass({
	getInitialState: function() {
		return {
			body: "",
			article_id:this.props.article_id,
			userSignedIn: SessionStore.isLoggedIn()
		};
	},
	componentDidMount: function() {
		this.SessionStoreToken = SessionStore.addListener(this.__onChange)
	},
	componentWillUnmount: function() {
		this.SessionStoreToken.remove()
	},
	__onChange: function () {
		this.setState({
			userSignedIn: SessionStore.isLoggedIn()
		})
	},
	handleInput: function (e) {
		this.setState({body:e.currentTarget.value});
	},
	handleSubmit: function (e) {
		e.preventDefault();
		CommentUtil.createArticleComment(this.state);
		this.setState({body:""})
	},
	render: function() {
		var label = (this.props.disabled) ? "Ya gotta read the article before you comment" : "Add Response";
		if (!this.state.userSignedIn) {
			return <div/>
		}
			var progressbar = (this.props.disabled && this.props.commentTimer < 100) ? <LinearProgress color={Colors.blue600} mode="determinate" value={this.props.commentTimer}/> : null 
		return (
			<section style={{width:"90%",margin:"0 auto"}} >
				<TextField
					multiLine={true}
					className="comment-form"
					disabled={this.props.disabled} 
					onChange={this.handleInput} 
					value={this.state.body} 
					floatingLabelText={label} />
				<RaisedButton 
					primary={true} 
					disabled={this.props.disabled} 
					style={{float:"right",marginTop:"20px"}} 
					onClick={this.handleSubmit} 
					label="Publish" />
        {progressbar}
			</section>
		);
	}

});

module.exports = CommentForm;
