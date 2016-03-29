React = require 'react'
ArticleIndexItem = require './article_index_item'
ArticleForm = require './article_form'
ArticleStore = require '../stores/articles'
ApiUtil = require '../util/api_util'

ArticleIndex = React.createClass
  stateFromStore: ->
    { articles: ArticleStore.all() }

  __onChange: ->
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
      <ArticleForm />
      <ul className="article-index">
        {articles}
      </ul>
    </div>

module.exports = ArticleIndex
