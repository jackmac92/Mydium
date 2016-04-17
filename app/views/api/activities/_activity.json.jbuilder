json.extract! activity, :id, :trackable_id, :trackable_type, :owner_id, :owner_type, :recipient_id, :recipient_type, :key
case activity.recipient_type
when "User"
	name = User.find(activity.recipient_id).name
when "Article"
	name = Article.find(activity.recipient_id).title
when "Tag"
	name = Tag.find(activity.recipient_id).name
end
json.recipient_name name