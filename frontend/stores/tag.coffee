Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
TagConstants = require '../constants/tag'

TagStore = new Store AppDispatcher

`_tags = []`

TagStore.all = ->
  `_tags.slice()`

resetTags = (tags) ->
  `_tags = tags`

addTag = (tag) ->
  `_tags.push(tag)`

TagStore.__onDispatch = (payload) ->
  switch payload.actionType
    when TagConstants.TAGS_RECEIVED
      resetTags(payload.tags)
      TagStore.__emitChange()

module.exports = TagStore
