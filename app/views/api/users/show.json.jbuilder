json.partial! 'user', user: @user

json.activities do
	json.array! @user.activity_list do |activity|
	  json.partial! 'api/activities/activity', activity: activity
	end
end