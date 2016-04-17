AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'
SearchConstants = require '../constants/search'
TagConstants = require '../constants/tag'
SessionConstants = require '../constants/session'
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

  receiveSingleDraft: (draft) ->
    pic = draft.picture
    draft.picture = {}
    draft.picture.preview = pic
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
