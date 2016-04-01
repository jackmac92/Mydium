json.partial! '/api/articles/article', article: @article

json.comments @article.comments, partial: '/api/comments/comment', as: :comment

json.authors_recent_articles do
	json.array! @article.user.recent_articles_excluding @article.id do |article|
		json.extract! article, :id, :title
	end
end