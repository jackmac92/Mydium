class Like < Socialization::ActiveRecordStores::Like
	include PublicActivity::Common
	after_save :mark_new_activity
	before_destroy :mark_rm_activity

	def mark_new_activity
		create_activity :like, recipient: likeable_type.constantize.find(likeable_id), owner:liker_type.constantize.find(liker_id)
	end
	def mark_rm_activity
		create_activity :unlike, recipient: likeable_type.constantize.find(likeable_id), owner: liker_type.constantize.find(liker_id)
	end
end
