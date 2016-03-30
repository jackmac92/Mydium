React = require 'react'
ReactQuill = require 'react-quill'

ArticleForm = React.createClass
  render: ->
    	<section>
  	  	<ReactQuill className="editor" value="Hello" />	
    	</section>
	getInitialState: ->
		{value: ""}

	

module.exports = ArticleForm

