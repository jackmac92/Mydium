import React from 'react'
import ReactQuill from 'react-quill'
import ReactDOM from 'react-dom'

import Input from 'react-toolbox/lib/input'
import ApiUtil from '../util/api_util'
import Checkbox from 'material-ui/lib/checkbox'
import RaisedButton from 'material-ui/lib/raised-button'

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
	updatePublished: function () {
		this.setState({
			published: !this.state.published
		})
	},
	formReady: function () {

		if (this.state.title && this.state.title.length != 0 && this.state.body_plain_text.length != 0) {
			return true
		} 
		return false;
	},	
  render: function () {
  	return (
  		<div>
	  		<Input label="Title" value={this.state.title} onChange={this.updateTitle} />
	  		<Input label="Subtitle" value={this.state.subTitle} onChange={this.updateSubTitle} />
	  		<ReactQuill	theme="snow"
	  								id="main-editor"
	  								value={this.state.body_stylized}
	  								onChange={this.updateBody}
	  								/>
	  		<Checkbox checked={this.state.published} onCheck={this.updatePublished} label="Publish?" />
				<RaisedButton disabled={!this.formReady()} onClick={this.handleSubmit}  label={ this.state.published ? "Submit" : "Save"}/>
  		</div>
  	)
  }

})
module.exports = ArticleForm