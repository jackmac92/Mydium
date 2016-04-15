Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
SessionConstants = require '../constants/session'

SessionStore = new Store AppDispatcher

`_currentUser = null`
`_currentUserHasBeenFetched = false`
`_userDrafts = []`
`_userPublished = []`
`_userFavorites = []`
`_userBookmarks = []`
`_userActivity = []`
SessionStore.currentUser = ->
	_currentUser

SessionStore.isLoggedIn = ->
	!!_currentUser

SessionStore.userDrafts = ->
	_userDrafts
SessionStore.userPublished = ->
	_userPublished
SessionStore.userFavorites = ->
	_userFavorites
SessionStore.userBookmarks = ->
	_userBookmarks
SessionStore.userActivity = ->
	_userActivity

SessionStore.currentUserHasBeenFetched = ->
	_currentUserHasBeenFetched

SessionStore.__onDispatch = (payload) ->
	switch payload.actionType
		when SessionConstants.CURRENT_USER_RECEIVED
			`_currentUser = payload.currentUser`
			`_currentUserHasBeenFetched = true`
			SessionStore.__emitChange()
		when SessionConstants.LOGOUT
			`_currentUser = null`
			`_currentUserHasBeenFetched = false`
			SessionStore.__emitChange()
		when SessionConstants.RECEIVED_DRAFTS
			`_userDrafts = payload.drafts`
			SessionStore.__emitChange()


module.exports = SessionStore