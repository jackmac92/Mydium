var React = require('react');
import ApiUtil from '../util/api_util'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

var CommentForm = React.createClass({
	getInitialState: function() {
		return {
			body: "",
			article_id:this.props.article_id
		};
	},
	handleInput: function (e) {
		this.setState({body:e});
	},
	handleSubmit: function (e) {
		e.preventDefault();
		ApiUtil.createArticleComment(this.state);
	},
	render: function() { 
		return (
			<section>
				<Input onChange={this.handleInput} label="Add Response" type="text" />
				<Button onClick={this.handleSubmit} raised accent label="Publish" />
			</section>
		);
	}

});

module.exports = CommentForm;