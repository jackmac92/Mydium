AppDispatcher = require '../dispatchers/dispatcher'
SessionConstants = require '../constants/session'

SessionActions =
  currentUserReceived: (currentUser) ->
    AppDispatcher.dispatch
      actionType: SessionConstants.CURRENT_USER_RECEIVED
      currentUser: currentUser
  logout: ->
  	AppDispatcher.dispatch
  		actionType: SessionConstants.LOGOUT

module.exports = SessionActions
