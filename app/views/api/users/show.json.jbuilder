json.partial! 'user', user: @user

json.activities do
	json.array! @activities do |activity|
	  json.partial! 'api/activities/activity', activity: activity
	end
end