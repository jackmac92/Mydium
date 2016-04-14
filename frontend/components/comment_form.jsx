var React = require('react');
import ApiUtil from '../util/api_util'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

var CommentForm = React.createClass({
	getInitialState: function() {
		return {
			body: "",
			article_id:this.props.article_id
		};
	},
	handleInput: function (e) {
		this.setState({body:e.currentTarget.value});
	},
	handleSubmit: function (e) {
		e.preventDefault();
		ApiUtil.createArticleComment(this.state);
		this.setState({body:""})
	},
	render: function() {
		return (
			<section>
				<TextField onChange={this.handleInput} value={this.state.body} floatingLabelText="Add Response" />
				<RaisedButton onClick={this.handleSubmit} label="Publish" />
			</section>
		);
	}

});

module.exports = CommentForm;
