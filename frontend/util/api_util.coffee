ApiActions = require '../actions/api'
SessionActions = require '../actions/session'
# xhr: -> 
#   xhr = new window.XMLHttpRequest()
#   xhr.addEventListener("progress", ((evt) -> statusCallback(evt.loaded / evt.total)), false)
#   xhr

ApiUtil =

  search: (query, page) ->
    $.ajax
      type: "GET"
      url:"api/searches"
      dataType: "json"
      data:
        query: query 
        page: page
      success: (response) ->
        ApiActions.receiveSearchResults response
      error: (e) ->
        console.log ("Search Error")
        console.log e

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
  ArticleUnpublish: (id, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/articles/"+id+"/unpublish"
      success: (article) ->
        callback && callback()
      error: ->
        console.log "ApiUtil#createNewArticle error"

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

          

  fetchBookmarkedArticles: (page, callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "user_bookmarks"
        page: page
      success: (articles) ->
        ApiActions.receiveBookmarkedArticles articles
      error: ->
        console.log "ApiUtil#fetch bookmarked"
      complete: ->
        callback && callback()

  fetchFavoritedArticles: (page, callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      data:
        article_type: "user_favorites"
        page: page
      success: (articles) ->
        ApiActions.receiveFavoritedArticles articles
      error: ->
        console.log "ApiUtil#fetch favorited"
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

  fetchDrafts: ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/user/drafts"
      success: (drafts) ->
        ApiActions.receiveUserDrafts drafts
      error: ->
        console.log "Error fetching all drafts"
  fetchPublished: ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/user/published"
      success: (articles) ->
        ApiActions.receiveUserPublished articles
      error: ->
        console.log "Error fetching published articles"
    
  fetchDraft: (id, callback) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles/"+id
      success: (draft) ->
        ApiActions.receiveSingleDraft draft
        callback && callback(draft)
      error: ->
        console.log "Error fetching draft"

  autoSave: (id, bodyStylized, bodyPlainText, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/articles/"+id+"/autosave"
      data:
        article:
          body_stylized: bodyStylized
          body_plain_text: bodyPlainText
      success: ->
        callback && callback()
      error: (e) ->
        console.log e
        console.log "Autosave error"

  updateArticle: (articleFormData, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      processData: false
      contentType: false
      url: "api/articles"
      data: articleFormData
      success: (article) ->
        ApiActions.receiveSingleArticle article
        callback && callback(article.id)
      error: ->
        console.log "ApiUtil#createNewArticle error"

  fetchUserTags: ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/user"
      data:
        receiver: "tag"
      success: (tags) ->
        ApiActions.receiveUserTags tags
      error: (e) ->
        console.log e
    

  tagFollowCreate: (tagId, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/user"
      data:
        receiver: "tag"
        tag_action: "follow"
        id: tagId
      success: (tags) ->
        ApiActions.receiveUserTags tags
        callback && callback()
      error: (e) ->
        console.log e

  tagFollowDestroy: (tagId, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/user"
      data:
        receiver: "tag"
        id: tagId
        tag_action: "unfollow"
      success: (tags) ->
        ApiActions.receiveUserTags tags
      error: (e) ->
        console.log e

  createArticleComment: (commentData) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/comments"
      data: {comment: commentData}
      success: (comment) ->
        ApiActions.receiveNewComment comment
  destroyArticleComment: (commentId) ->
    $.ajax
      type: "DELETE"
      dataType: "json"
      url: "api/comments/"+commentId
      success: ->
        ApiActions.commentDeleted commentId

  setNewArticleId: (callback) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/articles"
      data:
        article:
          body_plain_text:""
          title:""
      success: (article) ->
        callback(article.id)
      error: ->
        console.log "ApiUtil#createNewArticle error"

  createNewArticle: (articleFormData, callback) ->
    $.ajax
      type: "POST"
      dataType: "json"
      processData: false
      contentType: false
      url: "api/articles"
      data: articleFormData
      success: (article) ->
        ApiActions.receiveSingleArticle article
        callback && callback(article.id)
      error: ->
        console.log "ApiUtil#createNewArticle error"

  markFavorite: (type, id) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/likes"
      data:
        r_type: type
        id: id
      success: (article) -> 
        ApiActions.receiveUpdatedArticle article
    
  unMarkFavorite: (type, id) ->
    $.ajax
      type: "DELETE"
      dataType: "json"
      url: "api/likes"
      data:
        r_type: type
        id: id
      success: (article) -> 
        ApiActions.receiveUpdatedArticle article
  

  createBookmark: (id) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/bookmarks"
      data:
        article_id: id
      success: (article) -> 
        ApiActions.receiveUpdatedArticle article
      error: (e) ->
        console.log e
        console.log "Error creating bookmark"
        
  removeBookmark: (id) ->
    $.ajax
      type: "DELETE"
      dataType: "json"
      url: "api/bookmarks"
      data:
        article_id: id
      success: (article) -> 
        ApiActions.receiveUpdatedArticle article
      error: (e) ->
        console.log e
        console.log "Error destroying bookmark"

  markFollow: (type, id) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/follows"
      data:
        r_type: type
        id: id
      success: (followStatus) -> 
        ApiActions.updateDetailFollow(followStatus)
      error: (e) ->
        console.log e

  unMarkFollow: (type, id) ->
    $.ajax
      type: "DELETE"
      dataType: "json"
      url: "api/follows"
      data:
        r_type: type
        id: id
      success: (followStatus) -> 
        ApiActions.updateDetailFollow(followStatus)
      error: (e) ->
        console.log e
  markArticleRead: (article_id) ->
    $.ajax
      type: "PATCH"
      url: "api/user"
      dataType: "json"
      data:
        receiver: "article"
        id: article_id
        user_action: "mark_read"
      success: ->
        console.log "Successfully marked article read"

  fetchUserInfo: (id) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/users/" + id
      success: (user) ->
        ApiActions.receiveUserInfo user
      error: ->
        console.log "ApiUtil#fetchUser error"

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
    

  fetchCurrentUser: (completion) ->
    $.ajax
      type: "GET"
      url: "api/auth"
      dataType: "json"
      success: (currentUser, textStatus, xhr) ->
        unless xhr.status == 204
          SessionActions.currentUserReceived currentUser 
      complete: ->
        completion && completion()
      error: ->
        console.log "Done gone wrong tryna fetch current user"
module.exports = ApiUtil
