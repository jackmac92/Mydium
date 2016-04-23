var React = require('react');
import ApiUtil from '../util/api_util'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
		var label = (this.props.disabled) ? "Ya gotta read the article before you comment" : "Add Response";
		return (
			<section style={{width:"60%",margin:"0 auto"}} >
				<TextField style={{width:"500px"}} disabled={this.props.disabled} onChange={this.handleInput} value={this.state.body} floatingLabelText={label} />
				<RaisedButton primary={true} disabled={this.props.disabled} style={{marginLeft:"40px"}} onClick={this.handleSubmit} label="Publish" />
			</section>
		);
	}

});

module.exports = CommentForm;
