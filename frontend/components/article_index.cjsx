React = require 'react'
ArticleIndexItem = require './article_index_item'
ArticleStore = require '../stores/articles'
ApiUtil = require '../util/api_util'

ArticleIndex = React.createClass
  stateFromStore: ->
    { articles: ArticleStore.all() }
  __onChange: ->
    console.log "Change event"
    @setState @stateFromStore()
  getInitialState: ->
    @stateFromStore()

  componentDidMount: ->
    @articleStoreToken = ArticleStore.addListener(@__onChange)
    ApiUtil.fetchArticles()

  componentWillUnmount: ->
    @articleStoreToken.remove()

  render: ->
    articles = @state.articles.map (article) ->
      <ArticleIndexItem key={article.id} article={article} />
    <div>
      {articles}
    </div>

module.exports = ArticleIndex
