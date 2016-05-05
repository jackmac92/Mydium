ApiActions = require '../actions/api'

UserUtil = 
  ArticlePublish: (id, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/articles/"+id+"/publish"
      success: (article) ->
        callback && callback()
      error: ->
        console.log "UserUtil#publish error"
    
  ArticleUnpublish: (id, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/articles/"+id+"/unpublish"
      success: (article) ->
        callback && callback()
      error: ->
        console.log "UserUtil#createNewArticle error"
        
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
        console.log "UserUtil#fetch bookmarked"
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
        console.log "UserUtil#fetch favorited"
      complete: ->
        callback && callback()
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
  destroyArticle: (id, callback) ->
    $.ajax
      type: "DELETE"
      dataType: "json"
      url: "api/articles/"+id
      success: (drafts) ->
        ApiActions.receiveUserDrafts drafts
        callback && callback()
      error: ->
        console.log "UserUtil#destroyArticle error"

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
  markArticleRead: (article_id) ->
    $.ajax
      type: "POST"
      url: "api/article_reads"
      dataType: "json"
      data:
        id: article_id
      success: ->
        console.log "Successfully marked article read"

  fetchUserInfo: (id) ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/users/" + id
      success: (user) ->
        ApiActions.receiveUserInfo user
      error: (e) ->
        console.log e
        console.log "UserUtil#fetchUser error"

module.exports = UserUtil
