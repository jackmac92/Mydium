Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
TagConstants = require '../constants/tag'

TagStore = new Store AppDispatcher

`_tags = {
	featured_tags: [],
	user_tags: []
	}`

TagStore.featured = ->
	`_tags.featured_tags.slice()`

TagStore.user = ->
	`_tags.user_tags.slice()`

resetTags = (tags) ->
  `_tags = tags`

TagStore.__onDispatch = (payload) ->
  switch payload.actionType
    when TagConstants.TAGS_RECEIVED
      resetTags payload.tags
      TagStore.__emitChange()

module.exports = TagStore
