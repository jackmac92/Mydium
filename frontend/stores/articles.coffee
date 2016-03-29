Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

ArticleStore = new Store AppDispatcher

_articles = []

ArticleStore.all = ->
  _articles.slice()

resetArticles = (articles) ->
  _articles = articles

addArticle = (article) ->
  _articles.push(article)

ArticleStore.__onDispatch = (payload) ->
  switch payload.actionType
    when ArticleConstants.ARTICLES_RECEIVED
      resetArticles(payload.articles)
      ArticleStore.__emitChange()

module.exports = ArticleStore
