AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'
TagConstants = require '../constants/tag'

ApiActions =
  receiveArticles: (articles) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLES_RECEIVED
      articles: articles
  receiveArticlesInfinite: (response) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLES_INFINITE_RECEIVED
      articles: response.articles
      meta: response.meta

  receiveTopArticles: (articles) ->
    for article in articles
      article.topArticle = true
    AppDispatcher.dispatch
      actionType: ArticleConstants.TOP_ARTICLES_RECEIVED
      articles: articles
  receiveSingleArticle: (article) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLE_DETAIL_RECEIVED
      article: article
  receiveUpdatedArticle: (article) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLE_UPDATE_RECEIVED
      article: article

  receiveAllTags: (tags) ->
    AppDispatcher.dispatch
      actionType: TagConstants.TAGS_RECEIVED
      tags: tags
  

  receiveNewComment: (comment) ->
  	AppDispatcher.dispatch
  		actionType: ArticleConstants.NEW_COMMENT_RECEIVED
  		comment: comment

module.exports = ApiActions
