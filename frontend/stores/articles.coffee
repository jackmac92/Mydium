Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

ArticleStore = new Store AppDispatcher

window._articles = []

ArticleStore.all = ->
  window._articles.slice()

resetArticles = (articles) ->
  window._articles = articles

addArticle = (article) ->
  window._articles.push(article)

ArticleStore.__onDispatch = (payload) ->
  switch payload.actionType
    when ArticleConstants.ARTICLES_RECEIVED
      resetArticles(payload.articles)
      ArticleStore.__emitChange()

module.exports = ArticleStore
