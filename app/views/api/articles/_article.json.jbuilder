json.extract! article, :id, :title, :body, :user_id

json.tags do
	json.array! article.tags do |tag|
		json.name tag.name
		json.id tag.id
	end
end
 
json.author do
	json.avatar asset_url(article.user.avatar.url)
	json.email article.user.email
end