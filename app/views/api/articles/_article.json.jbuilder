json.extract! article, :id, :title, :body, :user_id
json.author do
		json.avatar asset_url(article.user.avatar.url)
		json.email article.user.email
end