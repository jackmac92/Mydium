AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

ApiActions =
  receiveAllArticles: (articles) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLES_RECEIVED
      articles: articles

module.exports = ApiActions
