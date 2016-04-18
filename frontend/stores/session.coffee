Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
SessionConstants = require '../constants/session'
TagConstants = require '../constants/tag'

SessionStore = new Store AppDispatcher

`_currentUser = null`
`_currentUserHasBeenFetched = false`
`_userDrafts = []`
`_userPublished = []`
`_userFavorites = []`
`_userBookmarks = []`
`_userActivity = []`
`_metaStore = {}`
`_userTags = []`

SessionStore.currentUser = ->
	_currentUser

SessionStore.isLoggedIn = ->
	!!_currentUser

SessionStore.userDrafts = ->
	`_userDrafts.slice()`
SessionStore.userPublished = ->
	`_userPublished.slice()`
SessionStore.userFavorites = ->
	`_userFavorites.slice()`
SessionStore.userBookmarks = ->
	`_userBookmarks.slice()`
SessionStore.userActivity = ->
	`_userActivity.slice()`
SessionStore.userTags = ->
	`_userTags.slice()`

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
		when SessionConstants.RECEIVED_FAVORITES
			`_userFavorites = payload.articles`
			`_metaStore["favorites"] = payload.meta`
			SessionStore.__emitChange()
		when SessionConstants.RECEIVED_BOOKMARKS
			`_metaStore["bookmarks"] = payload.meta`
			`_userBookmarks = payload.articles`
			SessionStore.__emitChange()
		when TagConstants.USER_TAGS_RECEIVED
			`_userTags = payload.tags`
			SessionStore.__emitChange()
			



module.exports = SessionStore