ApiActions = require '../actions/api'
SessionActions = require '../actions/session'

SearchUtil = 

  search: (query, page, callback) ->
    $.ajax
      type: "GET"
      url:"api/searches"
      dataType: "json"
      data:
        query: query 
        page: page
      success: (response) ->
        ApiActions.receiveSearchResults response
        callback && callback()
      error: (e) ->
        console.log ("Search Error")
        console.log e

module.exports = SearchUtil