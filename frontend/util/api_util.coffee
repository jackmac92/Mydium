ApiActions = require '../actions/api'

ApiUtil =
  fetchArticles: () ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      success: (articles) ->
        ApiActions.receiveAllArticles articles
      error: ->
        console.log "ApiUtil#fetchArticles error"


  fetchUser: (id) ->
    $.ajax
    type: "GET"
    dataType: "json"
    url: "api/users/" + id
    success: (user) ->
      ApiActions.receiveUserInfo user
      error: ->
        console.log "ApiUtil#fetchSingleArticle error"

  fetchArticleDetail: (id) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles/" + id
      success: (article) ->
        ApiActions.receiveSingleArticle article
      error: ->
        console.log "ApiUtil#fetchSingleArticle error"

  createNewArticle: (article) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/articles"
      success: (article) ->
        ApiActions.receiveSingleArticle article
      error: ->
        console.log "ApiUtil#createNewArticle error"
  createNewArticle: (article) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/articles"
      success: (article) ->
        ApiActions.receiveSingleArticle article
      error: ->
        console.log "ApiUtil#createNewArticle error"
        


module.exports = ApiUtil
