ApiActions = require '../actions/api'
SessionActions = require '../actions/session'

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

  fetchCurrentUser: (completion) ->
    $.ajax
      type: "GET"
      url: "api/auth"
      dataType: "json"
      success: (currentUser) ->
        SessionActions.currentUserReceived currentUser
      complete: ->
        completion && completion()
      error: ->
        console.log "Done gone wrong tryna fetch current user"

  logOutUser: (callback) ->
    $.ajax
      type: "DELETE"
      url: "api/users/sign_out"
      dataType: "json"
      success: ->
        SessionActions.logout()
        callback && callback()

  logInUser: (userCredentials, callback) ->
    $.ajax
      type: "POST"
      url: "api/users/sign_in"
      dataType: "json"
      data: {user: userCredentials}
      success: (currentUser) ->
        SessionActions.currentUserReceived currentUser
        callback && callback()
      error: (e) ->
        console.log "Done gone wrong when loggin in"
        console.log e
    

        

window.ApiUtil = ApiUtil
module.exports = ApiUtil
