json.extract! article, :id, :title
json.created_at time_ago_in_words(article.created_at)
json.body minified ? truncate(article.body, length: 250) : article.body

json.tags do
	json.array! article.tags do |tag|
		json.name tag.name
		json.id tag.id
	end
end
 
json.author do
	json.partial! '/api/users/user', user: article.user
end

json.picture asset_url(article.picture.url)

json.num_responses article.comments.count

json.read_time article.body.split.length / 275
if user_signed_in?
	json.user do
		json.faved_article current_user.likes? article
		json.bookmarked_article current_user.bookmarks.where(article_id: article.id).any?
	end
end
