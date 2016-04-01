AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

ApiActions =
  receiveAllArticles: (articles) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLES_RECEIVED
      articles: articles
  receiveSingleArticle: (article) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLE_DETAIL_RECEIVED
      article: article

module.exports = ApiActions
