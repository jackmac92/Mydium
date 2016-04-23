import React from 'react'
import ReactQuill from 'react-quill'
import ReactDOM from 'react-dom'

import ApiUtil from '../util/api_util'
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone'
import TextField from 'material-ui/TextField';
import WritingStore from '../stores/writing'
import RefreshIndicator from 'material-ui/RefreshIndicator';


var ArticleForm = React.createClass({
	
	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return {
				title: "",
				subtitle: "",
				body_plain_text: "",
				body_stylized: "",
				picture: null,
				newPicture: false,
				published: true,
				autoSaving: "hide"
			};
	},
	
	handleFiles: function (picture) {
		this.setState({
			newPicture: true,
			picture: picture[0]
		});
	},
	componentDidMount: function() {
		this.writingStoreToken = WritingStore.addListener(this.__onChange)
		if (this.props.params.id) {
			ApiUtil.fetchDraft(this.props.params.id)
		} else {
			ApiUtil.setNewArticleId( function(id) {this.setState({id: id})}.bind(this))
		}
	},

	componentWillUnmount: function() {
		this.writingStoreToken.remove()
	},
	__onChange: function () {
		var draft = WritingStore.getDetail();
		this.setState({
			title: draft.title,
			subTitle: draft.subtitle,
			body_plain_text: draft.body_plain_text,
			body_stylized: draft.body_stylized,
			picture: draft.picture,
			id: draft.id
		})
	},
	handleSubmit: function (e) {
		e.preventDefault();
		debugger
		var formData = new FormData();
		if (this.state.newPicture) {
			formData.append("article[picture]", this.state.picture);
		};
		formData.append("article[title]", this.state.title);
		formData.append("article[subtitle]", this.state.subTitle);
		formData.append("article[published]", this.state.published);
		formData.append("article[body_plain_text]", this.state.body_plain_text);
		formData.append("article[body_stylized]", this.state.body_stylized);

		var router = this.context.router;
		ApiUtil.createNewArticle(formData, function (articleId) {router.push('/article/'+articleId);})
	},
	
	updateTitle: function (e) {
		this.setState({title:e.currentTarget.value})
	},
	
	updateSubTitle: function (e) {
		this.setState({subTitle:e.currentTarget.value})
	},
	
	updateBody: function (e) {
		var regex = /(^|[^@\w])@(\w{1,15})\b\s/
		var replace = '$1<a class="user-mention" href="/#/users/$2">@$2</a>';
		this.setState({
			body_stylized:e.replace( regex, replace ),
			body_plain_text: $(".ql-editor")[0].innerText,
			autoSaving: "ready"
		});
		clearTimeout(this.autoSaveTimeout)
		this.autoSaveTimeout = setTimeout(this.autoSave, 500)
		clearTimeout(this.writersBlockTimeout)
		this.writersBlockTimeout = setTimeout(this.writersBlock, 500)

	},
	writersBlock: function () {
	},
	
	autoSave: function () {
		this.setState({autoSaving: "loading"})
		ApiUtil.autoSave(this.state.id ,this.state.body_stylized, this.state.body_plain_text, function () {this.setState({autoSaving: "hide"})}.bind(this))
	},
	
	updatePublished: function () {
		this.setState({
			published: !this.state.published
		})
	},
	
	formReady: function () {
		if (this.state.title && this.state.title.length != 0 && this.state.body_plain_text.length != 0 && this.state.picture) {
			return true
		} 
		return false;
	},

  render: function () {
  	var uploadPreview;
  	if (this.state.picture) {
  		uploadPreview = <img id="article-picture-preview" src={this.state.picture.preview} />
  	}
  	return (
  		<div>
  			<div className="article-attrs">
	  			<TextField id="title-field" floatingLabelText="Title" value={this.state.title} onChange={this.updateTitle} />
	  			<div />
		  		<TextField id="subtitle-field" floatingLabelText="Subtitle" value={this.state.subTitle} onChange={this.updateSubTitle} />
		  		<div id="dropzone">
			  		<Dropzone onDrop={this.handleFiles}>
			  			<div>Drop your image here</div>
				  		{uploadPreview}
			  		</Dropzone>
		  		</div>
		  		<Checkbox checked={this.state.published} onCheck={this.updatePublished} label="Publish?" />
  			</div>
		    <RefreshIndicator
		      size={40}
		      left={20}
		      top={250}
		      status={this.state.autoSaving}
		    />
	  		<ReactQuill	theme="snow"
	  								id="main-editor"
	  								value={this.state.body_stylized}
	  								onChange={this.updateBody}
	  								/>
				<RaisedButton disabled={!this.formReady()} onClick={this.handleSubmit}  label={ this.state.published ? "Submit" : "Save"}/>
  		</div>
  	)
  }

})
module.exports = ArticleForm