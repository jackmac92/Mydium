class Mention < Socialization::ActiveRecordStores::Mention
	include PublicActivity::Common
	after_save :mark_new_activity

	belongs_to :mentioner, polymorphic: true
	belongs_to :mentionee, polymorphic: true
	
	def mark_new_activity
		create_activity :mention, recipient: mentionable_type.constantize.find(mentionable_id), owner:mentioner_type.constantize.find(mentioner_id)
	end
end
