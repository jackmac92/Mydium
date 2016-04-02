json.featured_tags do
	json.array! @featured_tags do |tag|
		json.partial! 'tag', tag: tag
	end
end
json.user_tags do
	json.array! @user_tags do |tag|
		json.partial! 'tag', tag: tag
	end
end
json.all_tags do
	json.array! @all_tags do |tag|
		json.partial! 'tag', tag: tag
	end
end