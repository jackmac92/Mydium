Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

ArticleStore = new Store AppDispatcher

`_articles = []`
`_articleDetail = null`

ArticleStore.all = ->
  _articles.slice()

ArticleStore.getDetail = ->
  _articleDetail

resetArticles = (articles) ->
  `_articles = articles`
  null

setDetail = (article) ->
  `_articleDetail = article`
  null

ArticleStore.__onDispatch = (payload) ->

  switch payload.actionType
    when ArticleConstants.ARTICLES_RECEIVED
    	resetArticles payload.articles
    	ArticleStore.__emitChange()
    when ArticleConstants.ARTICLE_DETAIL_RECEIVED
    	setDetail payload.article
    	ArticleStore.__emitChange()

module.exports = ArticleStore