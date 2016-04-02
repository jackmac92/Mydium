React = require 'react'
ReactQuill = require 'react-quill'

ArticleForm = React.createClass
	getInitialState: ->
		{value: ""}
  render: ->
    	<section>
  	  	<ReactQuill className="editor" value="Hello" />	
    	</section>

module.exports = ArticleForm

