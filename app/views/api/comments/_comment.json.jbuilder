json.extract! comment, :id, :article_id, :body 
json.user do
	json.partial! '/api/users/user', user: comment.user
end