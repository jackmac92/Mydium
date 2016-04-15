class Like < Socialization::ActiveRecordStores::Like
	include PublicActivity::Common
	after_save :mark_new_activity
	def mark_new_activity
		create_activity :like, recipient: likeable_type.constantize.find(likeable_id), owner:likeer_type.constantize.find(liker_id)
	end
end
