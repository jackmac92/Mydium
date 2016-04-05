AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'
TagConstants = require '../constants/tag'

ApiActions =
  receiveAllArticles: (articles) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLES_RECEIVED
      articles: articles
  receiveTopArticles: (articles) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.TOP_ARTICLES_RECEIVED
      articles: articles

  receiveSingleArticle: (article) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.ARTICLE_DETAIL_RECEIVED
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
