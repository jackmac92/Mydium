json.extract! article, :id, :title, :body

json.tags do
	json.array! article.tags do |tag|
		json.name tag.name
		json.id tag.id
	end
end
 
json.author do
	json.partial! '/api/users/user', user: article.user
end