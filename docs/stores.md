# ArticleStore

	### Actions
		receiveAllArticles
		receiveSingleArticle
	### Listeners
		ArticleIndex
		ArticleDetail

# ArticleFormStore
	### Actions
		recieveArticleFormParams
	### Listeners
		ArticleForm

# UsersStore 	
	### Actions
		receiveUsers
	### Listeners
		ArticleIndex
		ArticleDetail
		UsersDetail

# TagStore 	
	### Actions
		receiveArticleTags
		receiveAllTags
		receiveUserTags
	### Listeners
		ArticleIndex
		ArticleDetail
		UsersDetail

#CommentStore
	### Actions
		receiveArticleComments
		receiveUserComments
	### Listeners
		ArticleDetail
		UsersDetail

#CommentFormStore
	### Actions
		receiveCommentFormParams
	### Listeners
		CommentForm

#SearchStore
	###Actions
		receiveSearchParams
	###Listeners
		SearchIndex
#SearchSuggestionStore
	###Actions
		receiveSearchSuggestions
	###Listeners
		SearchSuggestions
