import React from 'react'
import ReactQuill from 'react-quill'
import ReactDOM from 'react-dom'

import ApiUtil from '../util/api_util'
import Checkbox from 'material-ui/lib/checkbox'
import RaisedButton from 'material-ui/lib/raised-button'
import Dropzone from 'react-dropzone'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import TextField from 'material-ui/lib/text-field';


var ArticleForm = React.createClass({
	
	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return {
				title: "",
				subtitle: "",
				body_plain_text: "",
				body_stylized: "",
				pictures: [],
				published: true
			};
	},
	handleFiles: function (pictures) {
		this.setState({
			pictures: pictures
		});
	},

	openDropZone: function () {
		this.refs.dropzone.open()
	},
	
	handleSubmit: function (e) {
		e.preventDefault();
		var formData = new FormData();

		formData.append("article[title]", this.state.title);
		formData.append("article[subtitle]", this.state.subtitle);
		formData.append("article[picture]", this.state.picture);
		formData.append("article[published]", this.state.published);
		formData.append("article[body_plain_text]", this.state.body_plain_text);
		formData.append("article[body_stylized]", this.state.body_stylized);

		var router = this.context.router;

		ApiUtil.createNewArticle(formData, function (articleId) {router.push('/article/'+articleId);})
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
  	var uploadPreview;
  	if (this.state.pictures.length > 0) {
  		uploadPreview = (
				<div className="picture-upload-preview">
		  		<h2>Uploading {this.state.pictures.length} pictures...</h2>
			    <div>{this.state.pictures.map((file) => <img src={file.preview} /> )}</div>
		    </div>
  		)
  	}
  	return (
  		<div>
	  			<TextField floatingLabelText="Title" value={this.state.title} onChange={this.updateTitle} />
		  		<TextField floatingLabelText="Subtitle" value={this.state.subTitle} onChange={this.updateSubTitle} />
		  		<Dropzone onDrop={this.handleFiles}>
		  			<div>Drop your image here</div>
		  		</Dropzone>
		  		{uploadPreview}
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