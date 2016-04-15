Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
ArticleConstants = require '../constants/article'

WritingStore = new Store AppDispatcher

`_article = {}`

WritingStore.getDetail = ->
  _article

setDetail = (draft) ->
  `_article = draft`
  null

WritingStore.__onDispatch = (payload) ->
  switch payload.actionType
    when ArticleConstants.DRAFT_RECEIVED
    	setDetail payload.draft
    	WritingStore.__emitChange()

module.exports = WritingStore
