AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'
TagConstants = require '../constants/tag'

ApiActions =
  receiveArticles: (response) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLES_RECEIVED
      articles: response.articles
      meta: response.meta

  receiveTopArticles: (response) ->
    for article in response.articles
      article.topArticle = true
    AppDispatcher.dispatch
      meta: response.meta
      articles: response.articles
      actionType: ArticleConstants.TOP_ARTICLES_RECEIVED

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
