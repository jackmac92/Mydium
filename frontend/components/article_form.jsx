import React from 'react'
import ReactQuill from 'react-quill'
import ReactDOM from 'react-dom'

import Paper from 'material-ui/lib/paper'
import Input from 'react-toolbox/lib/input'
import ApiUtil from '../util/api_util'
import Button from 'react-toolbox/lib/button'

var MediumEditor = require('react-medium-editor');

var ArticleForm = React.createClass({
	contextTypes: {router: React.PropTypes.object.isRequired},
	getInitialState: function () {
		return {
				title: "",
				subtitle: "",
				body_plain_text: "",
				body_stylized: "",
				published: true
			};
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;
		var newArticle = this.state
		ApiUtil.createNewArticle(newArticle, function (articleId) {router.push('/article/'+articleId);})
	},
	updateTitle: function (e) {
		console.log(e)
		this.setState({title:e})
	},
	updateSubTitle: function (e) {
		this.setState({subTitle:e})
	},
	updateBody: function (e) {
		this.setState({
			body_stylized:e,
			body_plain_text: $(".ql-editor")[0].innerText
		});
	},
	formReady: function () {

		if (this.state.title && this.state.title.length != 0 && this.state.body_plain_text.length != 0) {
			return true
		} 
		return false;
	},	
  render: function () {
  	var button;
		if (this.formReady()) {
			button = <Button raised accent ripple onClick={this.handleSubmit} label="Submit" />
		} else {
			button = <Button disabled onClick={this.handleSubmit} label="Submit" />
		}
  	return (
  		<div>
	  		<Input label="Title" value={this.state.title} onChange={this.updateTitle} />
	  		<Input label="Subtitle" value={this.state.subTitle} onChange={this.updateSubTitle} />
	  		<ReactQuill	theme="snow"
	  								id="main-editor"
	  								value={this.state.body_stylized}
	  								onChange={this.updateBody}
	  								/>
				{button}
  		</div>
  	)
  }

})
module.exports = ArticleForm