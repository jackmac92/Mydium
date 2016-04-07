json.extract! comment, :id, :article_id, :body 
json.userMadeComment comment.user == current_user
json.user do
	json.partial! '/api/users/user', user: comment.user
end