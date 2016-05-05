ApiActions = require '../actions/api'

ArticleUtil = 
  fetchTagsIndex: ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/tags"
      success: (tags) ->
        ApiActions.receiveAllTags tags
      error: ->
        console.log "ApiUtil#fetchTags error"

  fetchArticlesByTag: (tag, page, callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "tag"
        tag: tag
        page: page
      success: (articles) ->
        ApiActions.receiveArticles articles
      complete: ->
        callback && callback()
  fetchArticle: (id) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles/" + id
      success: (article) ->
        ApiActions.receiveSingleArticle article
      error: ->
        console.log "Error fetching article"

  fetchTopArticles: (page, callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "popular"
        page: page
      success: (response) ->
        ApiActions.receiveTopArticles response
      error: ->
        console.log "ApiUtil#fetchTopArticles error"
      complete: ->
        callback && callback()

  fetchArticles: (page, completionCallback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        page: page
      success: (articles) ->
        ApiActions.receiveArticles articles
      error: (e) ->
        console.log "ApiUtil#fetchArticles error"
        console.log e
      complete: ->
        completionCallback && completionCallback()
        
module.exports = ArticleUtil
