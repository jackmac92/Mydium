Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

x = {b:{c:{val:true}}}

ArticleStore = new Store AppDispatcher

`_articles = []`
`_articleDetail = null`

ArticleStore.all = ->
  _articles.slice()

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
    when ArticleConstants.ARTICLE_DETAIL_RECEIVED
      setDetail payload.article
      ArticleStore.__emitChange()
    when ArticleConstants.NEW_COMMENT_RECEIVED
      addComment payload.comment
      ArticleStore.__emitChange()


module.exports = ArticleStore