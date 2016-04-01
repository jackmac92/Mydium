AppDispatcher = require '../dispatchers/dispatcher'
TagConstants = require '../constants/tag'

TagActions =
  tagsReceived: (tags) ->
    AppDispatcher.dispatch
      actionType: TagConstants.TAGS_RECEIVED
      tags: tags

module.exports = TagActions
