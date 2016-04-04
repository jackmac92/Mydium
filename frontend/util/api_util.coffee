ApiActions = require '../actions/api'
SessionActions = require '../actions/session'

ApiUtil =
  fetchArticles: ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      success: (articles) ->
        ApiActions.receiveAllArticles articles
      error: ->
        console.log "ApiUtil#fetchArticles error"
  
  fetchTagsIndex: ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/tags"
      success: (tags) ->
        ApiActions.receiveAllTags tags
      error: ->
        console.log "ApiUtil#fetchTags error"

  fetchArticle: (id) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles/" + id
      success: (article) ->
        ApiActions.receiveSingleArticle article
      error: ->
        console.log "Error fetching article"

  createArticleComment: (commentData) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/comments"
      data: {comment: commentData}
      success: (comment) ->
        ApiActions.receiveNewComment comment


  createNewArticle: (article, callback) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/articles"
      data: article: article
      success: (article) ->
        ApiActions.receiveSingleArticle article
      error: ->
        console.log "ApiUtil#createNewArticle error"
      complete: ->
        callback && callback()

  toggleFavorite: (article_id) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/article"
      success: (article) ->
        console.log "worked"
  toggleBookmark: (article) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/"
      success: () ->
      error: () ->
      complete: () ->
  toggleFollow: (user) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/"
      success: () ->
      error: () ->
      complete: () ->

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
      url: "users/sign_out"
      dataType: "json"
      success: ->
        SessionActions.logout()
        callback && callback()

  logInUser: (userCredentials, callback) ->
    $.ajax
      type: "POST"
      url: "users/sign_in"
      dataType: "json"
      data: {user: userCredentials}
      success: (currentUser) ->
        SessionActions.currentUserReceived currentUser
        callback && callback()
      error: (e) ->
        console.log "Done gone wrong when loggin in"
        console.log e
    
  createNewUser: (userForm, callback) ->
    $.ajax
      type: "POST"
      url: "users/"
      dataType: "json"
      data: {user: userForm}
      success: (currentUser) ->
        SessionActions.currentUserReceived currentUser
        callback && callback()
      error: (e) ->
        console.log "Done gone wrong when making new user"
        console.log e
  # fetchUser: (id) ->
  #   $.ajax
  #   type: "GET"
  #   dataType: "json"
  #   url: "api/users/" + id
  #   success: (user) ->
  #     ApiActions.receiveUserInfo user
  #   error: ->
  #     console.log "ApiUtil#fetchSingleArticle error"

        

window.ApiUtil = ApiUtil
module.exports = ApiUtil
