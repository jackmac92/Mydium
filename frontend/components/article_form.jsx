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
			subTitle: "",
			body_stylized: ""
		}
	},

	componentDidMount: function() {
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;
		var newArticle = this.state
		newArticle.body_plain_text = $(".ql-editor")[0].innerText
		ApiUtil.createNewArticle(newArticle, function (articleId) {router.push('/article/'+articleId);})
	},
	updateTitle: function (e) {
		this.setState({title:e})
	},
	updateSubTitle: function (e) {
		this.setState({subTitle:e})
	},
	updateBody: function (e) {
		this.setState({body:e})
	},
	formReady: function () {
		if (this.state.title.length != 0 && this.state.body.length != 0) {
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
	  								value={this.state.body}
	  								onChange={this.updateBody}
	  								/>
				{button}
  		</div>
  	)
  }

})
module.exports = ArticleForm
			// <MediumEditor value={this.state.body} onChange={this.updateBody}/>