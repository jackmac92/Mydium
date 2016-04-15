class Follow < Socialization::ActiveRecordStores::Follow
	include PublicActivity::Common
	after_save :mark_new_activity
	def mark_new_activity
		create_activity :follow, recipient: followable_type.constantize.find(followable_id), owner:follower_type.constantize.find(follower_id)
	end
end
