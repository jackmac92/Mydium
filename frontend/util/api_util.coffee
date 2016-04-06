ApiActions = require '../actions/api'
SessionActions = require '../actions/session'
# xhr: -> 
#   xhr = new window.XMLHttpRequest()
#   xhr.addEventListener("progress", ((evt) -> statusCallback(evt.loaded / evt.total)), false)
#   xhr

ApiUtil =
  fetchArticles: (completionCallback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      success: (articles) ->
        ApiActions.receiveArticles articles
      error: (e) ->
        console.log "ApiUtil#fetchArticles error"
        console.log e
      complete: ->
        completionCallback && completionCallback()
  fetchArticlesInfinite: (page, completionCallback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        page: page
      success: (response) ->
        ApiActions.receiveArticlesInfinite response
      error: (e) ->
        console.log "ApiUtil#fetchArticles error"
        console.log e
      complete: ->
        completionCallback && completionCallback()

  fetchTopArticles: (callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "popular"
      success: (articles) ->
        ApiActions.receiveTopArticles articles
      error: ->
        console.log "ApiUtil#fetchTopArticles error"
      complete: ->
        callback && callback()

  fetchArticlesByTag: (tag, callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "tag"
        tag: tag
      success: (articles) ->
        ApiActions.receiveArticles articles
      complete: ->
        callback && callback()

  fetchBookmarkedArticles: (callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "user_bookmarks"
      success: (articles) ->
        ApiActions.receiveArticles articles
      error: ->
        console.log "ApiUtil#fetch bookmarked"
      complete: ->
        callback && callback()
  fetchFavoritedArticles: (callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "user_favorites"
      success: (articles) ->
        ApiActions.receiveArticles articles
      error: ->
        console.log "ApiUtil#fetch bookmarked"
      complete: ->
        callback && callback()

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
      url: "api/user"
      data:
        receiver: "article"
        id: article_id
        user_action: "toggle_favorite"
      success: (article) ->
        ApiActions.receiveUpdatedArticle article

  toggleBookmark: (article_id) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/user"
      data:
        receiver: "article"
        id: article_id
        user_action: "toggle_bookmark"
      success: (article) ->
        ApiActions.receiveUpdatedArticle article
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
