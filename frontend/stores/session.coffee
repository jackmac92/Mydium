Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
SessionConstants = require '../constants/session'

SessionStore = new Store AppDispatcher

_currentUser = null
_currentUserHasBeenFetched = false

SessionStore.currentUser = ->
	_currentUser

SessionStore.isLoggedIn = ->
	!!_currentUser

SessionStore.currentUserHasBeenFetched = ->
	_currentUserHasBeenFetched

SessionStore.__onDispatch = (payload) ->
	switch payload.actionType
		when SessionConstants.CURRENT_USER_RECEIVED
			_currentUser = payload.currentUser
			_currentUserHasBeenFetched = true
			SessionStore.__emitChange()
		when SessionConstants.LOGOUT
			_currentUser = null
			SessionStore.__emitChange()


module.exports = SessionStore
		
	