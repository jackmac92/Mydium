React = require 'react'

ApiUtil = require '../util/api_util'
ArticleStore = require '../stores/articles'

ArticleForm = require './article_form'
ArticleIndexItem = require './article_index_item'

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
      <section className="content-main">
        <ArticleForm />
        <ul className="article-index">
          {articles}
        </ul>
      </section>
    </div>

module.exports = ArticleIndex

# write here
# top picks for you, closable
# regular index

# component for sidebar pieces? or overall component
# ajax progress bar
# a lot of the next aspects rely on user auth? likes, follows, save for later, profile pic
