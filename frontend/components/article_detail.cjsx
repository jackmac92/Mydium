React = require('react')
ArticleStore = require '../stores/articles'
ApiUtil = require '../util/api_util'

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
  	<article>
  		<h1>{@state.article.title}</h1>
  		<p>{@state.article.body}</p>
  	</article>


module.exports = ArticleDetail