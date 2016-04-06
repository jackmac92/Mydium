import React from 'react'
import ReactQuill from 'react-quill'

import Input from 'react-toolbox/lib/input'
import ApiUtil from '../util/api_util'
import Button from 'react-toolbox/lib/button'

var ArticleForm = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return {
			title: "",
			body: "",
			published: true
		}
	},

	handleSubmit: function (e) {
		e.preventDefault();
		var router = this.context.router;
		ApiUtil.createNewArticle(this.state, function () {router.push('/');})

	},

	updateTitle: function (e) {
		this.setState({title:e})
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
				<Input type="text" onChange={this.updateTitle} label="Title" value={this.state.title}/>
				{button}
  		</div>
  	)
  }

})
module.exports = ArticleForm

