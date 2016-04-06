Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

ArticleStore = new Store AppDispatcher

`_mainStore = {}`
`_articleDetail = null`

ArticleStore.all = ->
  for id, article of _mainStore
    article

ArticleStore.topArticles = ->
  articles = []
  for id, article of _mainStore
    articles.push article if article.topArticle
  articles

ArticleStore.bookmarkedArticles = ->
  articles = []
  for id, article of _mainStore
    articles.push article if article.user.bookmarked_article
  articles

ArticleStore.taggedArticles = (tag) ->
  articles = []
  for id, article of _mainStore
    articleTags = article.tags.map (t) -> t.name
    articles.push article if articleTags.includes(tag)
  articles

ArticleStore.getDetail = ->
  _articleDetail

ArticleStore.update = (id,newArticle) ->
  _mainStore[id] = newArticle

ArticleStore.updateArticleLike = (id, value) ->
  _mainStore[id].user.faved_article = value

ArticleStore.updateArticleBookmark = (id, value) ->
  _mainStore[id].user.bookmarked_article = value

setDetail = (article) ->
  `_articleDetail = article`
  null

addArticles = (articles) ->
  for article in articles
    _mainStore[article.id] = article
  null

addComment = (comment) ->
  _articleDetail.comments.push comment

ArticleStore.__onDispatch = (payload) ->

  switch payload.actionType
    when ArticleConstants.ARTICLES_RECEIVED
      addArticles payload.articles
      ArticleStore.__emitChange()
    when ArticleConstants.TOP_ARTICLES_RECEIVED
      addArticles payload.articles
      ArticleStore.__emitChange()
    when ArticleConstants.TAG_ARTICLES_RECEIVED
      addArticles payload.articles
      ArticleStore.__emitChange()
    when ArticleConstants.BOOKMARKED_ARTICLES_RECEIVED
      addArticles payload.articles
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