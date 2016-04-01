React = require('react')
ArticleStore = require '../stores/articles'
ApiUtil = require '../util/api_util'
Tag = require './tag'
Comments = require './comments_section'

ArticleDetail = React.createClass

  stateFromStore: ->
    article: ArticleStore.getDetail()

  __onChange: ->
    @setState @stateFromStore()

  getInitialState: ->
    @stateFromStore()

  componentWillReceiveProps: (nextProps) ->
    ApiUtil.fetchArticle parseInt(nextProps.params.id)

  componentDidMount: ->
    @articleStoreToken = ArticleStore.addListener(@__onChange)
    ApiUtil.fetchArticle parseInt(@props.params.id)

  componentWillUnmount: ->
    @articleStoreToken.remove()

  render: ->
  	unless @state.article
  		return <h2>Loading...</h2>
  	if @state.article.tags
	  	tags = @state.article.tags.map (t) -> 
  			<Tag key={t.id} tag={t} />
  	<content>
	  	<article>
		  	<img className="author-thumb" src={@state.article.author.avatar} />
		  	<p className="author-email">{@state.article.author.email}</p>
	    	<ul>
	    		{tags}
	    	</ul>
	  		<h1>{@state.article.title}</h1>
	  		<p>{@state.article.body}</p>
	  	</article>
	  	<section>
		  	<h3>Other posts by author</h3>
		  	<ul>
		  		<li>Article</li>
		  		<li>other</li>
		  		<li>more</li>
		  		<li>and again</li>
		  	</ul>
	  	</section>
  		<Comments comments={@state.article.comments} />
  	</content>		


module.exports = ArticleDetail