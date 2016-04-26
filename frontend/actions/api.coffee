AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'
SearchConstants = require '../constants/search'
TagConstants = require '../constants/tag'
SessionConstants = require '../constants/session'
UserConstants = require '../constants/user'

ApiActions =
  
  receiveArticlePicture: (picture) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.DRAFT_PICTURE_RECEIVED
      picture: picture

  toggleDetailFollow: ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.DETAIL_UPDATE
      attr: "toggle_follow"
  updateDetailFollow: (followStatus) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.DETAIL_UPDATE
      followStatus: followStatus
    
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
  receiveUserTags: (tags) ->
    AppDispatcher.dispatch
      actionType: TagConstants.USER_TAGS_RECEIVED
      tags: tags
  receiveBookmarkedArticles: (payload) ->
    AppDispatcher.dispatch
      actionType: SessionConstants.RECEIVED_BOOKMARKS
      articles: payload.articles
      meta: payload.meta

  receiveFavoritedArticles: (payload) ->
    AppDispatcher.dispatch
      actionType: SessionConstants.RECEIVED_FAVORITES
      articles: payload.articles
      meta: payload.meta
    

  receiveUserDrafts: (drafts) ->
    AppDispatcher.dispatch
      actionType: SessionConstants.RECEIVED_DRAFTS
      drafts: drafts
  receiveUserPublished: (articles) ->
    AppDispatcher.dispatch
      actionType: SessionConstants.RECEIVED_PUBLISHED
      articles: articles

  receiveUserInfo: (user) ->
    AppDispatcher.dispatch
      actionType: UserConstants.RECEIVED_USER_DETAIL
      user: user

  receiveSingleDraft: (draft) ->
    unless draft.body_stylized
      draft.body_stylized = "<div>"+draft.body_plain_text+"</div>"
    AppDispatcher.dispatch
      actionType: ArticleConstants.DRAFT_RECEIVED
      draft: draft
      
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
  
  commentDeleted: (commentId) ->
    AppDispatcher.dispatch
      actionType: ArticleConstants.COMMENT_DELETED
      commentId: commentId

  receiveNewComment: (comment) ->
  	AppDispatcher.dispatch
  		actionType: ArticleConstants.NEW_COMMENT_RECEIVED
  		comment: comment

  receiveSearchResults: (response) ->
    AppDispatcher.dispatch
      actionType: SearchConstants.SEARCH_RESULTS_RECEIVED
      searchResults: response.search_results
      meta: response.meta

module.exports = ApiActions
