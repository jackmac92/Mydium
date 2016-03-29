ApiActions = require '../actions/api'

ApiUtil = {
  fetchArticles: () ->
    $.ajax
      type: "GET"
      dataType: "json"
      url: "api/articles"
      success: (articles) ->
        ApiActions.receiveAllArticles articles
      error: ->
        console.log "ApiUtil#fetchArticles error"
}

module.exports = ApiUtil
