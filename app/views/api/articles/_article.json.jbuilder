json.extract! article, :id, :title, :subtitle

unless minified
	json.extract! article, :body_stylized, :body_plain_text
end

json.created_at time_ago_in_words(article.created_at)

if article.published
	json.published_at time_ago_in_words(article.published_at)
	json.pubTime article.published_at.to_i
end

json.tags do
	json.array! article.tags do |tag|
		json.name tag.name
		json.id tag.id
	end
end



json.num_views article.view_count
json.author do
	json.partial! '/api/users/user', user: article.user
end

unless article.picture.url == "/pictures/original/missing.png"
	json.picture asset_path(article.picture.url(:large))
	json.loading_pic asset_url(article.picture.url(:thumb))
else
	json.picture nil
end


json.num_responses article.comments.count

unless article.body_plain_text.nil?
	json.read_time article.body_plain_text.split.length / 275
	json.body minified ? truncate(article.body_plain_text, length: 250) : article.body_stylized || article.body_plain_text
end


if user_signed_in?
	json.user do
		json.faved_article current_user.likes? article
		json.bookmarked_article current_user.bookmarks.where(article_id: article.id).any?
		json.follows_author current_user.follows? article.user
	end
end
