Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

ArticleStore = new Store AppDispatcher

# Main store by id, and fill arrays by meta?
  # pass by reference?
# Always render article index component (for bookmarks and top articles, differentiate with a prop?)

# store in main object, function for _articles, bookmarked articles

`_mainStore = {}`
`_articles = []`
`_articleDetail = null`
`_topArticles = []`
`_taggedArticles = []`
`_bookmarkedArticles = []`
`_currentStore = _articles`

ArticleStore.all = ->
  _articles.slice()

ArticleStore.topArticles = ->
  _topArticles.slice()

ArticleStore.bookmarkedArticles = ->
  _bookmarkedArticles.slice()

ArticleStore.taggedArticles = ->
  _taggedArticles.slice()

ArticleStore.getDetail = ->
  _articleDetail

ArticleStore.indexOf = (id) ->
  indices = _articles.map (article) -> article.id
  indices.indexOf id

ArticleStore.update = (id,newArticle) ->
  _articles[ArticleStore.indexOf(id)] = newArticle

ArticleStore.updateArticleLike = (id, value) ->
  _articles[ArticleStore.indexOf(id)].user.faved_article = value

ArticleStore.updateArticleBookmark = (id, value) ->
  _articles[ArticleStore.indexOf(id)].user.bookmarked_article = value

resetArticles = (articles) ->
  `_articles = articles`
  null
resetTopArticles = (articles) ->
  `_topArticles = articles`
  null
resetBookmarkedArticles = (articles) ->
  `_bookmarkedArticles = articles`
  null
resetTaggedArticles = (articles) ->
  `_taggedArticles = articles`
  null

setDetail = (article) ->
  `_articleDetail = article`
  null

addComment = (comment) ->
  _articleDetail.comments.push comment

ArticleStore.__onDispatch = (payload) ->

  switch payload.actionType
    when ArticleConstants.ARTICLES_RECEIVED
      resetArticles payload.articles
      ArticleStore.__emitChange()
    when ArticleConstants.TOP_ARTICLES_RECEIVED
      resetArticles payload.articles
      ArticleStore.__emitChange()
    when ArticleConstants.TAG_ARTICLES_RECEIVED
      resetArticles payload.articles
      ArticleStore.__emitChange()
    when ArticleConstants.BOOKMARKED_ARTICLES_RECEIVED
      resetArticles payload.articles
      ArticleStore.__emitChange()
    when ArticleConstants.ARTICLE_DETAIL_RECEIVED
      setDetail payload.article
      ArticleStore.__emitChange()
    when ArticleConstants.ARTICLE_UPDATE_RECEIVED
      ArticleStore.update payload.article.id, payload.article
      ArticleStore.__emitChange()
    when ArticleConstants.NEW_COMMENT_RECEIVED
      addComment payload.comment
      ArticleStore.__emitChange()


module.exports = ArticleStore