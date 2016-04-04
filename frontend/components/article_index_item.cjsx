React = require 'react'
Tag = require './tag'


ArticleIndexItem = React.createClass

	contextTypes:
		router: React.PropTypes.object.isRequired
	viewArticle: ->
		@context.router.push 'article/' + @props.article.id

 render: ->

  	if @props.article.tags
	  	tags = @props.article.tags.map (t) -> 
  			<Tag key={t.id} tag={t} />
				
		
    <li onClick={@viewArticle} className="article-index-item">
    	<p className="author-email">{@props.article.author.email}</p>
    	<ul>
    		{tags}
    	</ul>
      <h2>{@props.article.title}</h2>
      <p className="article-index-item-body">{@props.article.body}</p>
    </li>


module.exports = ArticleIndexItem