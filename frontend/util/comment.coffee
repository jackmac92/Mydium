ApiActions = require '../actions/api'

CommmentUtil = 
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
module.exports = CommmentUtil
