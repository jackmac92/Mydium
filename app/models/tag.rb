class Tag < ActiveRecord::Base
	validates :name, presence: true
	has_many :taggings, dependent: :destroy
	
	acts_as_followable
end
