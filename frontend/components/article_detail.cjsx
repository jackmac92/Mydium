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
  	if @state.article.authors_recent_articles
  		other_articles = @state.article.authors_recent_articles.map (article) ->
  			<li key={article.id}>{article.title}</li>
  		author_recent_posts = <section><h3>Author Recent Posts</h3><ul>{other_articles}</ul></section>


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
	  	<hr />
	  	{author_recent_posts}
	  	<hr />
  		<Comments article_id={@state.article.id} comments={@state.article.comments} />
  	</content>		


module.exports = ArticleDetail