React = require 'react'
Sticky = require 'react-stickydiv'


ApiUtil = require '../util/api_util'
ArticleStore = require '../stores/articles'
SessionStore = require '../stores/session'

ArticleIndexItem = require './article_index_item'
Sidebar = require './sidebar'

ArticleIndex = React.createClass
  stateFromStore: ->
    { articles: ArticleStore.all() }

  __onChange: ->
    @setState @stateFromStore()

  getInitialState: ->
    @stateFromStore()

  componentDidMount: ->
    # @sessionStoreToken = SessionStore.addListener(@__onChange)
    # ApiUtil.fetchCurrentUser()
    @articleStoreToken = ArticleStore.addListener(@__onChange)
    ApiUtil.fetchArticles()

  componentWillUnmount: ->
    @articleStoreToken.remove()
    # @sessionStoreToken.remove()

  render: ->
    articles = @state.articles.map (article) ->
      <ArticleIndexItem key={article.id} article={article} />

    <main>
      <section className="content-main">
        <input type="text" placeholder="Write here..." />
        <ul className="article-index">
          {articles}
        </ul>
      </section>
      <section>
        <Sticky>
          <Sidebar />
        </Sticky>
      </section>
    </main>

module.exports = ArticleIndex


