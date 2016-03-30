React = require 'react'
ReactQuill = require 'react-quill'


ArticleForm = React.createClass
  render: ->
  	<section>
	  	<ReactQuill value="Hello" />	
  	</section>

	

module.exports = ArticleForm

