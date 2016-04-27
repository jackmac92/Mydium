import React from 'react'
import ReactQuill from 'react-quill'
import ReactDOM from 'react-dom'

import ApiUtil from '../util/api_util'
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone'
import TextField from 'material-ui/TextField';
import WritingStore from '../stores/writing'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';


var ArticleForm = React.createClass({
	
	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return {
				title: "",
				subtitle: "",
				body_plain_text: null,
				body_stylized: "",
				picture: null,
				autoSaving: "hide",
				loadingPic: false,
				idSet: false
			};
	},
	
	componentDidMount: function() {
		this.writingStoreToken = WritingStore.addListener(this.__onChange)
		if (this.props.params.id) {
			ApiUtil.fetchDraft(this.props.params.id)
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
			id: draft.id,
			idSet: true
		})
	},
	handleFiles: function (picture) {
		var picData = new FormData();
		debugger
		this.setState({loadingPic: true})
		picData.append("picture", picture[0])
		ApiUtil.setArticlePicture(this.state.id, picData, function (picture) {
			this.setState({
				picture: picture,
				loadingPic: false
			})
		}.bind(this))
	},
	handleSubmit: function (e) {
		e.preventDefault();
		var formData = new FormData();
		formData.append("article[picture]", this.state.picture);
		formData.append("article[title]", this.state.title);
		formData.append("article[subtitle]", this.state.subTitle);
		formData.append("article[body_plain_text]", this.state.body_plain_text);
		formData.append("article[body_stylized]", this.state.body_stylized);

		var router = this.context.router;
		ApiUtil.createNewArticle(formData, function (articleId) {router.push('/article/'+articleId);})
	},
	handlePublish: function (e) {
		e.preventDefault()
		var that = this;
		ApiUtil.ArticlePublish(this.state.id, () => that.context.router.push("/article/"+that.state.id))
	},
	autoSave: function () {
		this.setState({autoSaving: "loading"})
		var articleData = {
			id:this.state.id,
			body_stylized: this.state.body_stylized,
			body_plain_text: this.state.body_plain_text,
			title: this.state.title,
			subtitle: this.state.subTitle
		}
		ApiUtil.autoSave(articleData, function () {this.setState({autoSaving: "hide"})}.bind(this))
	},

	setId: function () {
		ApiUtil.setNewArticleId(this.state.title, function(id) {this.setState({id: id, idSet:true})}.bind(this))	
	},
	
	updateTitle: function (e) {
		this.setState({title:e.currentTarget.value})
		if (!this.state.idSet) {
			clearTimeout(this.setIdTimeout)
			this.setIdTimeout = setTimeout(this.setId, 1000)
		}
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
	
	
	updatePublished: function () {
		this.setState({
			published: !this.state.published
		})
	},
	
	formReady: function () {
		if (this.state.title && this.state.title.length != 0 && this.state.body_plain_text && this.state.picture) {
			return true
		} 
		return false;
	},

  render: function () {
  	var uploadPreview;
  	if (this.state.picture) {
  		uploadPreview = <img id="article-picture-preview" src={this.state.picture} />
  	}
  	if (this.state.loadingPic) {
  		uploadPreview = <CircularProgress />
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
					<RaisedButton disabled={!this.formReady()} onClick={this.handlePublish}  label="Publish"/>
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
  		</div>
  	)
  }

})
module.exports = ArticleForm