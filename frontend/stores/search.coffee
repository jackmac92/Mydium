Store = require('flux/utils').Store
AppDispatcher = require '../dispatchers/dispatcher'
SearchConstants = require '../constants/search'

SearchStore = new Store AppDispatcher

`_searchResults = []`
`_meta = {}`

SearchStore.all = ->
	`_searchResults.slice()`

SearchStore.meta = ->
	$.extend(true, {}, _meta)

setSearchResults = (results) ->
	oldResults = `_searchResults`
	newResults = results || []
	`_searchResults = oldResults.concat(newResults)`
	null

resetMeta = (meta) ->
  `_meta = meta`
  null

SearchStore.__onDispatch = (payload) ->
	switch payload.actionType
		when SearchConstants.SEARCH_RESULTS_RECEIVED
			setSearchResults payload.searchResults
			resetMeta payload.meta
			SearchStore.__emitChange()

module.exports = SearchStore