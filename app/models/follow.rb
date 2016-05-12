class Follow < Socialization::ActiveRecordStores::Follow
	include PublicActivity::Common
	after_save :mark_new_activity
	before_destroy :mark_rm_activity

	belongs_to :follower, polymorphic: true
	belongs_to :followee, polymorphic: true

	def mark_new_activity
		create_activity :follow, recipient: followable_type.constantize.find(followable_id), owner:follower_type.constantize.find(follower_id)
	end
	def mark_rm_activity
		create_activity :unfollow, recipient: followable_type.constantize.find(followable_id), owner: follower_type.constantize.find(follower_id)
	end
end
