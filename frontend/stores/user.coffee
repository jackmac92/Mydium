Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
UserConstants = require '../constants/user'

UserStore = new Store AppDispatcher

`_userDetail = null`

UserStore.detail = ->
	_userDetail

UserStore.__onDispatch = (payload) ->
	switch payload.actionType
		when UserConstants.RECEIVED_USER_DETAIL
			`_userDetail = payload.user`
			UserStore.__emitChange()



module.exports = UserStore