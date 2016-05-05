WritingUtil = 
  autoSave: (article,callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      url: "api/articles/"+article.id+"/autosave"
      data:
        article: article
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

  setArticlePicture: (article_id, picture, callback) ->
    $.ajax
      type: "PATCH"
      dataType: "json"
      processData: false
      contentType: false
      url: "api/articles/" + article_id + "/picture"
      data: picture
      success: (picture) ->
        callback && callback(picture)
      error: ->
        console.log "ApiUtil#setPicture error"
    
  setNewArticleId: (title, callback) ->
    $.ajax
      type: "POST"
      dataType: "json"
      url: "api/articles/new_id"
      data:
        article:
          title:title
      success: (id) ->
        callback(id)
      error: (e) ->
        console.log e
        console.log "ApiUtil#setIdErr error"

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
module.exports = WritingUtil
