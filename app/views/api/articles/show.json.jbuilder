json.partial! 'article', article: @article

json.comments @article.comments, partial: '/api/comments/comment', as: :comment

#author recent articles